import { Transaction } from '../../models/transaction';

export interface IGetTransactionsRepository {
    getTransactions(): Promise<Transaction[]>
}
