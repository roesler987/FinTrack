import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateTransactionRepository } from "./protocols";
import { Transaction } from "../../models/transaction";
import { UpdateTransactionParams } from "./protocols";

export class UpdateTransactionController implements IController {
    constructor(private readonly updateTransactionRepository: IUpdateTransactionRepository) {}

    async handle(httpRequest: HttpRequest<UpdateTransactionParams>): Promise<HttpResponse<Transaction>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body;

            if (!id) {
                return {
                    statusCode: 400,
                    body: "Transaction ID is missing",
                };
            }

            if (!body || Object.keys(body).length === 0) {
                return {
                    statusCode: 400,
                    body: "No data provided for update",
                };
            }

            const transaction = await this.updateTransactionRepository.updateTransaction(id, body);

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
