import type { Request, Response } from "express";

import type { UserQuery, UserParams } from "../types/user.type";

import {
  createUserService,
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
  loginUserService,
} from "../services/user.service";
import type {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "../../../schemas/user.schema";

export const createUser = async (
  req: Request<{}, {}, CreateUserInput>,

  res: Response,
) => {
  // Request<{}, {}, CreateUserInput> or req.body as CreateUserInput
  // نوحد السيستم بقى ونعمل Request<{}, {}, CreateUserInput>
  const user = await createUserService(req.body);

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};
export const loginUser = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
) => {
  const { user, token } = await loginUserService(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
  });
};

export const getUsers = async (
  req: Request<{}, {}, {}, UserQuery>,
  res: Response,
) => {
  const users = await getUsersService(req.query);

  return res.status(200).json({
    success: true,
    data: users,
  });
};

export const getUser = async (req: Request<UserParams>, res: Response) => {
  const user = await getUserService(req.params.id);

  return res.status(200).json({
    success: true,
    data: user,
  });
};
export const getMe = async (req: Request, res: Response) => {
  const user = await getUserService(req.user.id);

  return res.status(200).json({
    success: true,
    data: user,
  });
};

export const updateUser = async (
  req: Request<{}, {}, UpdateUserInput>,
  res: Response,
) => {
  const password = req.body.password;

  if (typeof password !== "string") {
    throw new Error("Password is required");
  }

  const user = await updateUserService(req.user.id, { ...req.body, password });

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserService(req.user.id);

  return res.status(204).send();
};
// Request<P = core.ParamsDictionary, // دلوقتي بقى اليوزر برامس
//  ResBody = any,
//  ReqBody = any,
//  ReqQuery = QueryString.ParsedQs,
//  Locals extends Record<string, any> = Record<string, any>>
