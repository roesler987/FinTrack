import { IController } from "../protocols";
import { IGetTransactionsRepository } from "./protcols";
import { Transaction } from '../../models/transaction';

export class GetTransactionsController implements IController {
  constructor(private readonly getTransactionsRepository: IGetTransactionsRepository) {}

  async handle() {
    try {
      const transactions: Transaction[] = await this.getTransactionsRepository.getTransactions();

      return {
        statusCode: 200,
        body: transactions,
      };
    } catch (error) {
      console.log("Error fetching transactions:", error);

      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
