import { Transaction } from "../../models/transaction";

export interface IDeleteTransactionRepository {
  deleteTransaction(id: string): Promise<Transaction>;
}
