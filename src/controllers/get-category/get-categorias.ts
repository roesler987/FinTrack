import { IController } from "../protocols";
import { IGetCategoriesRepository } from "./protocols";

export class GetCategoriesController implements IController {
  constructor(private readonly getCategoryRepository: IGetCategoriesRepository) {}

  async handle() {
    try {
      const categories = await this.getCategoryRepository.getCategories();

      return {
        statusCode: 200,
        body: categories,
      };
    } catch (error) {
      console.log("Error fetching categories:", error);

      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
