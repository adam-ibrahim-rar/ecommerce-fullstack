import * as reviewRepository from "../repositories/review.repository";
import * as productRepository from "../repositories/product.repository";

import type {
  CreateReviewInput,
  ReviewResponse,
} from "../types/review.type";

import { AppError } from "../utils/app-error.util";
import prisma from "../../../config/prisma";

const formatReview = (review: any): ReviewResponse => {
  return {
    id: review.id,
    rating: review.rating,
    ...(review.comment !== null && { comment: review.comment }),
    createdAt: review.createdAt.toISOString(),
    user: {
      id: review.user.id,
      username: review.user.username,
      firstName: review.user.firstName,
      lastName: review.user.lastName,
    },
  };
};

const syncProductRatingService = async (productId: string) => {
  const stats = await reviewRepository.aggregateByProductId(productId);

  await prisma.product.update({
    where: { id: productId },
    data: {
      rating: stats._avg.rating ?? 0,
      reviews: stats._count._all,
    },
  });
};

export const getReviewsService = async (
  productId: string
): Promise<ReviewResponse[]> => {
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const reviews = await reviewRepository.findByProductId(productId);

  return reviews.map(formatReview);
};

export const addReviewService = async (
  userId: string,
  productId: string,
  data: CreateReviewInput
): Promise<ReviewResponse> => {
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const review = await reviewRepository.upsert(userId, productId, data);

  await syncProductRatingService(productId);

  return formatReview(review);
};
