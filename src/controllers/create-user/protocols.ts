import { User } from "../../models/user";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  initialIncome: number;
}

export interface ICreateUseRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
