import { ObjectId } from "mongodb";
import { IDeleteTransactionRepository } from "../../controllers/delete-transaction/protocols";
import { MongoClient } from "../../database/mongo";
import { Transaction } from "../../models/transaction";

export class MongoDeleteTransactionRepository implements IDeleteTransactionRepository {
  async deleteTransaction(id: string): Promise<Transaction> {
    const transaction = await MongoClient.db.collection<Omit<Transaction, "id">>("transactions").findOne({ _id: new ObjectId(id) });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const { deletedCount } = await MongoClient.db.collection("transactions").deleteOne({ _id: new ObjectId(id) });

    if (deletedCount === 0) {
      throw new Error("Transaction not deleted");
    }

    const { _id, ...rest } = transaction;

    return { id: _id.toHexString(), ...rest };
  }
}
