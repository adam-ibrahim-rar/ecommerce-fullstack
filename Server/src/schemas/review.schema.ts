import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

export const reviewProductParamsSchema = z.object({
  id: z.string().uuid(),
});

export type ReviewProductParams = z.infer<
  typeof reviewProductParamsSchema
>;
