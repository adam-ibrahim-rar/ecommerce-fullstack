import * as userRepository from "../repositories/user.repository";

import type {
  CreateUserInput,
  UpdateUserInput,
  UserQuery,
} from "../types/user.type";

import { AppError } from "../utils/app-error.util";
export const createUserService = async (data: CreateUserInput) => {
  const existingUserByEmail = await userRepository.findByEmail(data.email);

  if (existingUserByEmail) {
    throw new AppError("Email already exists", 409);
  }
  const existingUserByUsername = await userRepository.findByUsername(data.username);

  if (existingUserByUsername) {
    throw new AppError("Username already exists", 409);
  }
  
  const user = await userRepository.create(data);

  return user;
};

export const getUsersService = async (query: UserQuery) => {
  if (query.email) {
    const user = await userRepository.findByEmail(query.email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  if (query.username) {
    const user = await userRepository.findByUsername(
      query.username
    );

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  return userRepository.findAll();
};

export const getUserService = async (id: string) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const updateUserService = async (
  id: string,
  data: UpdateUserInput
) => {
  const existingUser = await userRepository.findById(id);

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  if (data.email) {
    const existingEmail = await userRepository.findByEmail(data.email);

    if (existingEmail && existingEmail.id !== id) {
      throw new AppError("Email already exists", 409);
    }
  }

  const user = await userRepository.update(id, data);

  return user;
};

export const deleteUserService = async (id: string) => {
  const existingUser = await userRepository.findById(id);

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.remove(id);
};