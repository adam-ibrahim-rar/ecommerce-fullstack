import api from "@/lib/axios";
import type { CreateReviewInput, Review } from "../types/review.type";

export const reviewsApi = {
  getReviews: async (productId: string): Promise<Review[]> => {
    const { data } = await api.get(`/products/${productId}/reviews`);
    return data.data;
  },

  createReview: async (
    productId: string,
    review: CreateReviewInput,
  ): Promise<Review> => {
    const { data } = await api.post(
      `/products/${productId}/reviews`,
      review,
    );
    return data.data;
  },
};
