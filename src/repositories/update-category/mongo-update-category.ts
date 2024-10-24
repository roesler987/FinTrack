import { ObjectId } from "mongodb";
import {
  IUpdateCategoryRepository,
  UpdateCategoryParams,
} from "../../controllers/update-category/protocols";
import { MongoClient } from "../../database/mongo";
import { Category } from "../../models/category";

export class MongoUpdateCategoryRepository implements IUpdateCategoryRepository {
  async updateCategory(id: string, params: UpdateCategoryParams): Promise<Category> {
    await MongoClient.db.collection("categories").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const category = await MongoClient.db
      .collection<Omit<Category, "id">>("categories")
      .findOne({ _id: new ObjectId(id) });

    if (!category) {
      throw new Error("Category not updated");
    }

    const { _id, ...rest } = category;
    return { id: _id.toHexString(), ...rest };
  }
}
