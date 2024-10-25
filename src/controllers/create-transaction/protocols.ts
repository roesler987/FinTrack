import { Transaction } from "../../models/transaction";

export interface CreateTransactionParams {
    id_usuario: number;
    tipo: 'entrada' | 'saida';
    valor: number;
    descricao: string;
    data: Date;
    saldo_anterior_transacao: number;
    saldo_apos_transacao: number;
    id_categoria: number;
  }
  

export interface ICreateTransactionRepository {
  createTransaction(params: CreateTransactionParams): Promise<Transaction>;
}
