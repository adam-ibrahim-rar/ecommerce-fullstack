import { z } from "zod";

const featuredSlotSchema = z
  .enum(["none", "large", "wide", "smallLeft", "smallRight"])
  .transform((val) => (val === "none" ? null : val))
  .optional();

const optionalDateString = z
  .string()
  .optional()
  .transform((val) => (val ? new Date(val) : undefined))
  .refine((val) => val === undefined || !isNaN(val.getTime()), {
    message: "Invalid date",
  });

export const createProductSchema = z
  .object({
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
    sizes: z.array(z.string()).optional(),
    categoryId: z.string().uuid(),

    isFlashSale: z.boolean().optional(),
    flashSaleEndsAt: optionalDateString,
    isBestSeller: z.boolean().optional(),
    featuredSlot: featuredSlotSchema,
  })
  .refine(
    (data) => !data.isFlashSale || data.flashSaleEndsAt !== undefined,
    {
      message: "flashSaleEndsAt is required when isFlashSale is true",
      path: ["flashSaleEndsAt"],
    },
  );

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    oldPrice: z.number().positive().optional(),
    discount: z.number().int().min(0).max(100).optional(),
    images: z.array(z.string()).min(1).optional(),
    rating: z.number().min(0).max(5).optional(),
    reviews: z.number().int().min(0).optional(),
    inStock: z.boolean().optional(),
    colors: z.array(z.string()).optional(),
    sizes: z.array(z.string()).optional(),
    categoryId: z.string().uuid().optional(),

    isFlashSale: z.boolean().optional(),
    flashSaleEndsAt: optionalDateString,
    isBestSeller: z.boolean().optional(),
    featuredSlot: featuredSlotSchema,
  })
  .refine(
    (data) => !data.isFlashSale || data.flashSaleEndsAt !== undefined,
    {
      message: "flashSaleEndsAt is required when isFlashSale is true",
      path: ["flashSaleEndsAt"],
    },
  );

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const productParamsSchema = z.object({
  id: z.string().uuid(),
});

export type ProductParams = z.infer<typeof productParamsSchema>;

export const productQuerySchema = z.object({
  title: z.string(),
  categoryId: z.string().uuid(),
});

export type ProductQuery = z.infer<typeof productQuerySchema>;