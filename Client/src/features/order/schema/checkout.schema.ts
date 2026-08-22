import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),

  companyName: z
    .string()
    .optional(),

  streetAddress: z
    .string()
    .min(5, "Street address is required"),

  apartment: z
    .string()
    .optional(),

  city: z
    .string()
    .min(2, "Town/City is required"),

  phone: z
    .string()
    .min(11, "Phone number is required"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  saveInformation: z
    .boolean()
    .default(false),
});

export type CheckoutFormValues =
  z.infer<typeof checkoutSchema>;