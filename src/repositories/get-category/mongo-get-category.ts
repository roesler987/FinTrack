import { IGetCategoriesRepository } from "../../controllers/get-category/protocols";
import { Category } from "../../models/category";
import { MongoClient } from "../../database/mongo";

export class MongoGetCategoriesRepository implements IGetCategoriesRepository {
  async getCategories(): Promise<Category[]> {
    const categories = await MongoClient.db
      .collection<Omit<Category, "id_categoria">>("categories")
      .find({})
      .toArray();

    return categories.map(({ _id, ...rest }) => ({
      ...rest,
      id_categoria: _id.toHexString(),
    }));
  }
}
