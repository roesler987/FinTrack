import { Category } from "../../models/category";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateCategoryRepository, UpdateCategoryParams } from "./protocols";

export class UpdateCategoryController implements IController {
  constructor(private readonly updateCategoryRepository: IUpdateCategoryRepository) {}

  async handle(httpRequest: HttpRequest<UpdateCategoryParams>): Promise<HttpResponse<Category>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing fields",
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing category id",
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateCategoryParams)[] = [
        "nome",
        "descricao",
      ];
      const someFieldsIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateCategoryParams)
      );

      if (someFieldsIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      const category = await this.updateCategoryRepository.updateCategory(id, body);

      return {
        statusCode: 200,
        body: category,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
