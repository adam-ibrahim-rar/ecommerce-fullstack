import { z } from "zod";

// ----------------------------------------
// Helpers
// ----------------------------------------

const optionalNumber = z.preprocess((value) => {
  if (
    value === "" ||
    value === undefined ||
    value === null ||
    Number.isNaN(value)
  ) {
    return undefined;
  }

  return Number(value);
}, z.number().positive("Value must be greater than 0").optional());

const optionalDiscount = z.preprocess((value) => {
  if (
    value === "" ||
    value === undefined ||
    value === null ||
    Number.isNaN(value)
  ) {
    return undefined;
  }

  return Number(value);
}, z.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100").optional());

// ----------------------------------------
// Create Product Schema
// ----------------------------------------

export const createProductSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Product title is required")
    .max(150, "Title must be less than 150 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Description must be less than 2000 characters")
    .optional()
    .or(z.literal("")),

  price: z.preprocess((value) => {
    if (
      value === "" ||
      value === undefined ||
      value === null ||
      Number.isNaN(value)
    ) {
      return undefined;
    }

    return Number(value);
  }, z.number().positive("Price must be greater than 0")),

  oldPrice: optionalNumber,

  discount: optionalDiscount,

  images: z
    .array(
      z.object({
        url: z
          .string()
          .trim()
          .min(1, "Image URL is required")
          .url("Invalid image URL"),
      }),
    )
    .min(1, "At least one image is required"),

  inStock: z.boolean(),

  colors: z
    .array(
      z.object({
        name: z.string().trim().optional().or(z.literal("")),

        value: z.string().trim().min(1, "Color value is required"),
      }),
    )
    .optional(),

  categoryId: z.string().trim().min(1, "Category is required"),
});

// ----------------------------------------
// Types
// ----------------------------------------

export type CreateProductFormInput = z.input<typeof createProductSchema>;

export type CreateProductFormValues = z.output<typeof createProductSchema>;
