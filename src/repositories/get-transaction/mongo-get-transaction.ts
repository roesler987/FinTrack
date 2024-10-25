import { IGetTransactionsRepository } from "../../controllers/get-transaction/protcols";
import { Transaction } from "../../models/transaction";
import { MongoClient } from "../../database/mongo";

export class MongoGetTransactionsRepository implements IGetTransactionsRepository {
  async getTransactions(): Promise<Transaction[]> {
    const transactions = await MongoClient.db
      .collection<Omit<Transaction, "id_transacao">>("transacoes")
      .find({})
      .toArray();

    return transactions.map(({ _id, ...rest }) => ({
      ...rest,
      id_transacao: _id.toHexString(),
    }));
  }
}
