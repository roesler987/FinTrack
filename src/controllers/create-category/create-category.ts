import validator from "validator";
import { Category } from "../../models/category";
import { HttpResponse, HttpRequest, IController } from "../protocols";
import { CreateCategoryParams, ICreateCategoryRepository } from "./protocols";
import { badRequest } from "../helpers";

export class CreateCategoryController implements IController {
  constructor(private readonly createCategoryRepository: ICreateCategoryRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateCategoryParams>
  ): Promise<HttpResponse<Category | string>> {
    try {
      const requiredFields = ["nome"];

      for (const field of requiredFields) {
        const value = httpRequest?.body?.[field as keyof CreateCategoryParams];

        if (typeof value === "string" && !value.trim().length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const category = await this.createCategoryRepository.createCategory(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: category,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
