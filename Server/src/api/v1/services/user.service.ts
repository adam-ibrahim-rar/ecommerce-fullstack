import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user.repository";

import type { UserQuery } from "../types/user.type";
import { AppError } from "../utils/app-error.util";
import bcrypt from "bcrypt";
import env from "../../../config/env";
import type {
  CreateUserInput,
  LoginUserInput,
  updateUserSchemaFromClient,
  
} from "../../../schemas/user.schema";

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
    throw new AppError("Email does not exists", 401);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Wrong password", 401);
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

export const updateUserService = async (
  id: string,
  data: updateUserSchemaFromClient
) => {
  const existingUser = await userRepository.findForUpdate(id);

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  const {
    password,
    newPassword,
    ...rest
  } = data;

  const updateData = Object.fromEntries(
    Object.entries(rest).filter(
      ([, value]) => value !== undefined && value !== ""
    )
  );

  if (newPassword) {
    if (!password) {
      throw new AppError(
        "Current password is required",
        400
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new AppError(
        "Current password is incorrect",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    return userRepository.update(id, {
      ...updateData,
      password: hashedPassword,
    });
  }

  // Normal update
  return userRepository.update(id, updateData);
};
export const deleteUserService = async (id: string) => {
  const existingUser = await userRepository.findById(id);

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.remove(id);
};
