import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteUserById,
  getUserById,
  getUsers,
} from "./usersApi";

import type {
  UsersQuery,
} from "../types/user.types";


// =====================================================
// Query Keys
// =====================================================

export const userKeys = {
  all: ["users"] as const,

  lists: () =>
    [...userKeys.all, "list"] as const,

  list: (params?: UsersQuery) =>
    [...userKeys.lists(), params] as const,

  details: () =>
    [...userKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...userKeys.details(), id] as const,
};


// =====================================================
// Users Query
// =====================================================

export const useUsersQuery = (
  params?: UsersQuery
) => {
  return useQuery({
    queryKey: userKeys.list(params),

    queryFn: () =>
      getUsers(params),
  });
};


// =====================================================
// User Details Query
// =====================================================

export const useUserQuery = (
  id?: string
) => {
  return useQuery({
    queryKey: userKeys.detail(id ?? ""),

    queryFn: () =>
      getUserById(id!),

    enabled: Boolean(id),
  });
};


// =====================================================
// Delete User Mutation
// =====================================================

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUserById(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });
    },
  });
};