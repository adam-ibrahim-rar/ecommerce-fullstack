import type {
  CreateUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "../schemas/auth.schema";

export type { CreateUserInput, LoginUserInput, UpdateUserInput };

export type UserParams = {
  id: string;
};
export interface GoogleAuthInput {
  credential: string;
}
 