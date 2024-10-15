import validator from "validator";

import { User } from "../../models/user";
import { HttpResponse, HttpRequest, IController } from "../protocols";
import {
  CreateUserParams,
  ICreateUseRepository,
} from "./protocols";
import { badRequest } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUseRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password", "initialIncome"];

      for (const field of requiredFields) {
        const value = httpRequest?.body?.[field as keyof CreateUserParams];

        if (typeof value === "string" && !value.trim().length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }

        if (typeof value === "number" && value < 0) {
          return {
            statusCode: 400,
            body: `Field ${field} must be a valid number greater than or equal to 0`,
          };
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return badRequest("E-mail is invalid");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
