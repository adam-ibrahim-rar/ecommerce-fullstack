export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface UserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserParams {
  id: string;
}

export interface UserQuery {
  username?: string;
  email?: string;
}