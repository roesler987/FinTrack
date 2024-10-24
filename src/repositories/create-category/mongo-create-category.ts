import { MongoClient } from "../../database/mongo";
import { ICreateCategoryRepository, CreateCategoryParams } from "../../controllers/create-category/protocols";
import { Category } from "../../models/category";

export class MongoCreateCategoryRepository implements ICreateCategoryRepository {
  async createCategory(params: CreateCategoryParams): Promise<Category> {
 
    const { insertedId } = await MongoClient.db
      .collection("categories")
      .insertOne(params);

    const category = await MongoClient.db
      .collection<Omit<Category, "id">>("categories")
      .findOne({ _id: insertedId });

    if (!category) {
      throw new Error('Category not created');
    }

    const { _id, ...rest } = category;


    return { id: _id.toHexString(), ...rest };
  }
}
