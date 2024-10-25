import { Transaction } from "../../models/transaction";

export interface UpdateTransactionParams {
    tipo?: 'entrada' | 'saida';
    valor?: string;
    descricao?: string;
  }
  

export interface IUpdateTransactionRepository {
  updateTransaction(id: string, params: UpdateTransactionParams): Promise<Transaction>;
}
