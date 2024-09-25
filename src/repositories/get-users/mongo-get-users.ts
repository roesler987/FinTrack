import { IGetUsersRepository } from "../../controllers/get-users/procols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository{
   async getUser(): Promise<User[]> {
        return [{
            firstName: "jean",
            lastName: "carlos",
            email: "teste@gmail.com",
            password: "abcde"
        }]
    }

}