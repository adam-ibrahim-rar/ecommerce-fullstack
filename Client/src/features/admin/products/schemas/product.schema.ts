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
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
    "Only JPG, PNG and WEBP images are allowed",
  )
  .refine(
    (file) => file.size <= MAX_IMAGE_SIZE,
    "Image must be less than 5MB",
  );

// ----------------------------------------
// Featured Slot (with "none" sentinel for the Select)
// ----------------------------------------

const featuredSlotSchema = z.preprocess((value) => {
  if (value === "none" || value === "" || value === undefined) {
    return undefined;
  }
  return value;
}, z.enum(["large", "wide", "smallLeft", "smallRight"]).optional());

// ----------------------------------------
// Flash Sale End Date
// ----------------------------------------
// يحول قيمة الـ <input type="datetime-local"> (زي "2000-03-09T12:45")
// إلى ISO-8601 كامل (زي "2000-03-09T12:45:00.000Z") عشان Prisma تقبلها.

const optionalDateString = z.preprocess((value) => {
  if (value === "" || value === undefined || value === null) {
    return undefined;
  }
  return value;
}, z
  .string()
  .optional()
  .refine(
    (value) => value === undefined || !Number.isNaN(new Date(value).getTime()),
    "Invalid date",
  )
  .transform((value) => (value ? new Date(value).toISOString() : undefined)));

// ----------------------------------------
// Schema
// ----------------------------------------

export const createProductSchema = z
  .object({
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

    isFlashSale: z.boolean().default(false),
    flashSaleEndsAt: optionalDateString,
    isBestSeller: z.boolean().default(false),
    featuredSlot: featuredSlotSchema,

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
          file: z
            .instanceof(File, {
              message: "Please select an image",
            })
            .refine(
              (file) =>
                ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                  file.type,
                ),
              "Only JPG, PNG and WEBP are allowed",
            )
            .refine(
              (file) => file.size <= MAX_IMAGE_SIZE,
              "Image must be less than 5MB",
            ),
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

    sizes: z
      .array(
        z.object({
          value: z.string().trim().min(1, "Size is required"),
        }),
      )
      .optional(),

    categoryId: z.string().trim().min(1, "Category is required"),
  })
  .refine((data) => !data.isFlashSale || Boolean(data.flashSaleEndsAt), {
    message: "Flash sale end date is required when flash sale is enabled",
    path: ["flashSaleEndsAt"],
  });

// ----------------------------------------
// Types
// ----------------------------------------

export type CreateProductFormInput = z.input<typeof createProductSchema>;

export type CreateProductFormValues = z.output<typeof createProductSchema>;