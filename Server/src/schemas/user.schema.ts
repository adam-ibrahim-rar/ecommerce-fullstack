import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});
export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const userParamsSchema = z.object({
  id: z.string().uuid(),
});

export type UserParams = z.infer<typeof userParamsSchema>;
