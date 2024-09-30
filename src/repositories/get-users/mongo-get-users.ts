import { IGetUsersRepository } from "../../controllers/get-users/procols";
import { User } from "../../models/user";
import { MongoCliente } from "../../database/mongo";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoCliente.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest, 
      id: _id.toHexString(),
    }));
  }
}
