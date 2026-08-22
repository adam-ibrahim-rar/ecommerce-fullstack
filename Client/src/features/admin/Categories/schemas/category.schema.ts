import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name is required")
    .max(50),

  icon: z
    .string()
    .trim()
    .min(1, "Please select an icon"),
});

export type CreateCategoryFormValues =
  z.infer<typeof createCategorySchema>;