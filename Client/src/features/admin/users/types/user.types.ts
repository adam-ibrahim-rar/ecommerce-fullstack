export type UserRole = "user" | "admin";

export interface AdminUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UsersQuery {
  search?: string;
  role?: UserRole;
  page?: number;
  limit?: number;
}

export interface UsersResponse {
  success: boolean;
  data: AdminUser[];
}

export interface UserResponse {
  success: boolean;
  data: AdminUser;
}