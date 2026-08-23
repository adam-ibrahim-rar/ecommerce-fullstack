import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewsApi } from "./reviewsApi";
import type { CreateReviewInput } from "../types/review.type";

export const useProductReviewsQuery = (productId: string) => {
  return useQuery({
    queryKey: ["products", productId, "reviews"],
    queryFn: () => reviewsApi.getReviews(productId),
    enabled: !!productId,
  });
};

export const useCreateReviewMutation = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: CreateReviewInput) =>
      reviewsApi.createReview(productId, review),

    onSuccess: () => {
      // نحدّث الريفيوز وبيانات المنتج (عشان الـ rating والـ reviews count يتحدّثوا)
      queryClient.invalidateQueries({ queryKey: ["products", productId, "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
    },
  });
};
