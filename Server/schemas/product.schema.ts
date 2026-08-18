import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  oldPrice: z.number().positive().optional(),
  discount: z.number().int().min(0).max(100).optional(),
  images: z.array(z.string()).min(1),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().int().min(0).optional(),
  inStock: z.boolean().optional(),
  colors: z.array(z.string()).optional(),
  categoryId: z.string().uuid(),
});

export type CreateProductInput = z.infer<
  typeof createProductSchema
>;

export const updateProductSchema =
  createProductSchema.partial();

export type UpdateProductInput = z.infer<
  typeof updateProductSchema
>;

export const productParamsSchema = z.object({
  id: z.string().uuid(),
});

export type ProductParams = z.infer<
  typeof productParamsSchema
>;

export const productQuerySchema = z.object({
  title: z.string().optional(),
  categoryId: z.string().uuid().optional(),
});

export type ProductQuery = z.infer<
  typeof productQuerySchema
>;