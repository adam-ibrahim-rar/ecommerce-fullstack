import prisma from "../../../config/prisma";

import type { CreateReviewInput } from "../types/review.type";

export const findByProductId = async (productId: string) => {
  return prisma.review.findMany({
    where: {
      productId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findByUserAndProduct = async (
  userId: string,
  productId: string
) => {
  return prisma.review.findUnique({
    where: {
      productId_userId: {
        productId,
        userId,
      },
    },
  });
};

export const upsert = async (
  userId: string,
  productId: string,
  data: CreateReviewInput
) => {
  return prisma.review.upsert({
    where: {
      productId_userId: {
        productId,
        userId,
      },
    },
    create: {
      userId,
      productId,
      rating: data.rating,
      comment: data.comment ?? null,
    },
    update: {
      rating: data.rating,
      comment: data.comment ?? null,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const aggregateByProductId = async (productId: string) => {
  return prisma.review.aggregate({
    where: {
      productId,
    },
    _avg: {
      rating: true,
    },
    _count: {
      _all: true,
    },
  });
};
