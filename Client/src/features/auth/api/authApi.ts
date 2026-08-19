import api from "../../../lib/axios";

import type {
  CreateUserInput,
  LoginUserInput,
} from "../schemas/auth.schema"
export const registerUser = async (data: CreateUserInput) => {
    const { data: response } = await api.post(
      "/users",
      data
    );
    return response;
};

export const loginUser = async (data: LoginUserInput) => {
    const { data: response } = await api.post(
      "/users/login",
      data
    );
    return response;
  
};
export const removeUser = async () => {
    const { data: response } = await api.delete(
      "/users/me");
    return response;
  
};