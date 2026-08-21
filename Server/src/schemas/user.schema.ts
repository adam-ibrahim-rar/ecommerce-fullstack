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
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.email("Please enter a valid email address.").optional(),
    password: z.string().optional(),
   });
export const updateUserSchemaFromClient = z
  .object({
    firstName: z.string().optional(),

    lastName: z.string().optional(),

    email: z
      .email("Please enter a valid email address.")
      .optional(),

    password: z.string(),

    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters.")
      .max(12, "New password must not exceed 12 characters.")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Current password is required.",
      path: ["password"],
    }
  );

export type UpdateUserSchemaFromClient = z.infer<
  typeof updateUserSchemaFromClient
>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type updateUserSchemaFromClient = z.infer<typeof updateUserSchemaFromClient>;

export const userParamsSchema = z.object({
  id: z.string().uuid(),
});

export type UserParams = z.infer<typeof userParamsSchema>;
