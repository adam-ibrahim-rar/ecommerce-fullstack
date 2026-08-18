import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user.repository";

import type {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
  UserQuery,
} from "../types/user.type";
import { AppError } from "../utils/app-error.util";
import bcrypt from "bcrypt";
import env from "../../../config/env";

export const createUserService = async (data: CreateUserInput) => {
  const existingUserByEmail = await userRepository.findByEmail(data.email);

  if (existingUserByEmail) {
    throw new AppError("Email already exists", 409);
  }

  const existingUserByUsername = await userRepository.findByUsername(
    data.username,
  );

  if (existingUserByUsername) {
    throw new AppError("Username already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await userRepository.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};

export const loginUserService = async (data: LoginUserInput) => {
  const user = await userRepository.findByEmailForLogin(data.email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    env.JWT_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  const { password, ...userData } = user;

  return {
    user: userData,
    token,
  };
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
    const user = await userRepository.findByUsername(query.username);

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

export const updateUserService = async (id: string, data: UpdateUserInput) => {
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

  if (data.username) {
    const existingUsername = await userRepository.findByUsername(data.username);

    if (existingUsername && existingUsername.id !== id) {
      throw new AppError("Username already exists", 409);
    }
  }

  const updateData = {
    ...data,
    ...(data.password
      ? {
          password: await bcrypt.hash(data.password, 10),
        }
      : {}),
  };

  return userRepository.update(id, updateData);
};

export const deleteUserService = async (id: string) => {
  const existingUser = await userRepository.findById(id);

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.remove(id);
};
