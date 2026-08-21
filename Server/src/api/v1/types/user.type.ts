
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