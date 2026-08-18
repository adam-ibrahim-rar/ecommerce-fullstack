import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

export type AddToCartInput = z.infer<
  typeof addToCartSchema
>;

export const updateCartSchema = z.object({
  quantity: z.number().int().positive(),
});

export type UpdateCartInput = z.infer<
  typeof updateCartSchema
>;

export const cartItemParamsSchema = z.object({
  id: z.string().uuid(),
});

export type CartItemParams = z.infer<
  typeof cartItemParamsSchema
>;