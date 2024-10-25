import { HttpResponse, HttpRequest, IController } from "../protocols";
import {
  CreateTransactionParams,
  ICreateTransactionRepository,
} from "./protocols";
import { Transaction } from "../../models/transaction";

export class CreateTransactionController implements IController {
  constructor(
    private readonly createTransactionRepository: ICreateTransactionRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateTransactionParams>
  ): Promise<HttpResponse<Transaction | string>> {
    try {
      const requiredFields = [
        "tipo",
        "valor",
        "descricao",
        "data",
        "saldo_anterior_transacao",
        "saldo_apos_transacao",
      ];

      for (const field of requiredFields) {
        const value =
          httpRequest?.body?.[field as keyof CreateTransactionParams];

        if (typeof value === "string" && !value.trim().length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }

        if (typeof value === "number" && value < 0) {
          return {
            statusCode: 400,
            body: `Field ${field} must be a valid number greater than or equal to 0`,
          };
        }
      }

      const transaction =
        await this.createTransactionRepository.createTransaction(
          httpRequest.body!
        );

      return {
        statusCode: 201,
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
