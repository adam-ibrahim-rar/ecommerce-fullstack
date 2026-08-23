import { z } from "zod";

export const addToWishlistSchema = z.object({
  productId: z.string().uuid(),
});

export type AddToWishlistInput = z.infer<
  typeof addToWishlistSchema
>;

export const wishlistItemParamsSchema = z.object({
  id: z.string().uuid(),
});

export type WishlistItemParams = z.infer<
  typeof wishlistItemParamsSchema
>;
