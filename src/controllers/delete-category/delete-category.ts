import { Category } from "../../models/category";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteCategoryRepository } from "./protocols";

export class DeleteCategoryController implements IController {
  constructor(private readonly deleteCategoryRepository: IDeleteCategoryRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Category>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing category id",
        };
      }

      const category = await this.deleteCategoryRepository.deleteCategory(id);

      return {
        statusCode: 200,
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
