import { z } from "zod";

export const createUserSchema = z.object({
  username: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(12, "Name must be at most 12 characters"),
      email: z.string().email("Invalid email"),
      password: z
        .string()
        .min(6, "Must be at least 6")
        .max(12, "Must be at most 12")
        ,});
export const loginUserSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
