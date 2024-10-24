import { ObjectId } from "mongodb";
import { IDeleteCategoryRepository } from "../../controllers/delete-category/protocols";
import { MongoClient } from "../../database/mongo";
import { Category } from "../../models/category";

export class MongoDeleteCategoryRepository implements IDeleteCategoryRepository {
  async deleteCategory(id: string): Promise<Category> {

    const category = await MongoClient.db.collection<Omit<Category, "id">>("categories").findOne({ _id: new ObjectId(id) });

    if (!category) {
      throw new Error("Category not found");
    }

    const { deletedCount } = await MongoClient.db.collection("categories").deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Category not deleted");
    }

    const { _id, ...rest } = category;

    return { id: _id.toHexString(), ...rest };
  }
}
