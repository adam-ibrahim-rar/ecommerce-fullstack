import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(12, "Username must not exceed 12 characters."),

  email: z.email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(12, "Password must not exceed 12 characters."),
});

export const loginUserSchema = z.object({
  email: z.email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

export const updateUserSchema = z
  .object({
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    email: z.email("Please enter a valid email address.").optional(),

    password: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isChangingPassword =
      data.password || data.newPassword || data.confirmPassword;

    if (!isChangingPassword) return;

    if (!data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Current password is required.",
      });
    }

    if (!data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["newPassword"],
        message: "New password is required.",
      });
    }

    if (!data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Please confirm your new password.",
      });
    }

    if (
      data.newPassword &&
      data.confirmPassword &&
      data.newPassword !== data.confirmPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "New password and confirmation password do not match.",
      });
    }
  });
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;