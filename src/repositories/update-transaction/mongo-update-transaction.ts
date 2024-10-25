import { ObjectId } from "mongodb";
import {
  IUpdateTransactionRepository,
  UpdateTransactionParams,
} from "../../controllers/update-transaction/protocols";
import { MongoClient } from "../../database/mongo";
import { Transaction } from "../../models/transaction";

export class MongoUpdateTransactionRepository implements IUpdateTransactionRepository {
  async updateTransaction(id: string, params: UpdateTransactionParams): Promise<Transaction> {
    await MongoClient.db.collection("transacoes").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const transaction = await MongoClient.db
      .collection<Omit<Transaction, "id">>("transacoes")
      .findOne({ _id: new ObjectId(id) });

    if (!transaction) {
      throw new Error("Transaction not updated");
    }

    const { _id, ...rest } = transaction;
    return { id: _id.toHexString(), ...rest };
  }
}
