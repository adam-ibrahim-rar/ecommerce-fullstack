import axios from "axios";

import type {
  AdminUser,
  UserResponse,
  UsersQuery,
  UsersResponse,
} from "../types/user.types";


// =====================================================
// Get Users
// =====================================================

export const getUsers = async (
  params?: UsersQuery
): Promise<AdminUser[]> => {
  const { data } = await axios.get<UsersResponse>(
    "/api/users",
    {
      params,
    }
  );

  return data.data;
};


// =====================================================
// Get User By ID
// =====================================================

export const getUserById = async (
  id: string
): Promise<AdminUser> => {
  const { data } = await axios.get<UserResponse>(
    `/api/users/${id}`
  );

  return data.data;
};