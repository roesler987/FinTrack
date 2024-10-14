import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteUserController, IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IDeleteUserController{
    constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
    async handle(httpeRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpeRequest?.params?.id;
            if(!id) {
                return {
                    statusCode: 400,
                    body:" Missinng user id",
                };
            }
            const user = await this.deleteUserRepository.deleteUser(id);
            
            return {
                statusCode:200,
                body:user,
            }
        } catch (error) {
            return {
                statusCode: 500,
                body:"Something went wrong",
            };
        }
    }
    
}