import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

// ----------------------------------------
// Ends At (optional countdown date)
// ----------------------------------------
// يحول قيمة الـ <input type="datetime-local"> (زي "2026-08-05T09:06")
// إلى ISO-8601 كامل (زي "2026-08-05T09:06:00.000Z") عشان Prisma تقبلها.

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

export const createBannerSchema = z.object({
  type: z.enum(["hero", "promo"], {
    error: "Banner type is required",
  }),

  title: z.string().trim().min(1, "Title is required").max(150),

  heading: optionalText(150),

  description: optionalText(500),

  image: z
    .instanceof(File, { message: "Please select an image" })
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
      "Only JPG, PNG and WEBP images are allowed",
    )
    .refine((file) => file.size <= MAX_IMAGE_SIZE, "Image must be less than 5MB"),

  buttonText: optionalText(50),

  link: z.string().trim().min(1, "Link is required"),

  endsAt: optionalDateString,

  order: z.preprocess((value) => {
    if (value === "" || value === undefined || value === null) return 0;
    return Number(value);
  }, z.number().min(0).default(0)),

  isActive: z.boolean().default(true),
});

export type CreateBannerFormInput = z.input<typeof createBannerSchema>;
export type CreateBannerFormValues = z.output<typeof createBannerSchema>;