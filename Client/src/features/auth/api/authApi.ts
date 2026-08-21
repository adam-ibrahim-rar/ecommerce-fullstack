import api from "../../../lib/axios";

import type { CreateUserInput, LoginUserInput, UpdateUserInput } from "../schemas/auth.schema";
export const registerUser = async (data: CreateUserInput) => {
  const { data: response } = await api.post("/users", data);
  return response;
};

export const loginUser = async (data: LoginUserInput) => {
  const { data: response } = await api.post("/users/login", data);
  return response;
};
export const updateUser = async (data: UpdateUserInput) => {
  const { data: response } = await api.patch("/users/me", data);
  return response;
};
export const removeUser = async () => {
  const { data: response } = await api.delete("/users/me");
  return response;
};
export const getCurrentUser = async () => {
  const { data: response } = await api.get("/users/me");
  return response;
};
