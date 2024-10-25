import {
    CreateTransactionParams,
    ICreateTransactionRepository,
  } from "../../controllers/create-transaction/protocols";
  import { MongoClient } from "../../database/mongo";
  import { Transaction } from "../../models/transaction";
  
  export class MongoCreateTransactionRepository implements ICreateTransactionRepository {
    async createTransaction(params: CreateTransactionParams): Promise<Transaction> {
      const { insertedId } = await MongoClient.db
        .collection("transacoes")
        .insertOne(params);
  
      const transaction = await MongoClient.db
        .collection<Omit<Transaction, "id">>('transacoes')
        .findOne({ _id: insertedId });
  
      if (!transaction) {
        throw new Error('Transaction not created');
      }
  
      const { _id, ...rest } = transaction;
  
      return { id: _id.toHexString(), ...rest };
    }
  }
  