import api from "@/lib/axios";

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
  const { data } = await api.get<UsersResponse>(
    "/users",
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
  const { data } = await api.get<UserResponse>(
    `/users/${id}`
  );

  return data.data;
};


// =====================================================
// Delete User By ID
// =====================================================

export const deleteUserById = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};