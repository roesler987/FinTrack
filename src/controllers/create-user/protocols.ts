import { User } from "../../models/user";
import { HttpResponse, HttpRequest } from '../protocols';

export interface ICreateUserController {
  handle(HttpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>>
}

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUseRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
