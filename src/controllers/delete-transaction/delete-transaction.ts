import { Transaction } from "../../models/transaction";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteTransactionRepository } from "./protocols";

export class DeleteTransactionController implements IController {
  constructor(private readonly deleteTransactionRepository: IDeleteTransactionRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Transaction>> {
    try {
      const id = httpRequest?.params?.id;
      if (!id) {
        return {
          statusCode: 400,
          body: "Missing transaction id",
        };
      }

      const transaction = await this.deleteTransactionRepository.deleteTransaction(id);

      return {
        statusCode: 200,
        body: transaction,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
