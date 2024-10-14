import { IController } from '../protocols';
import { IGetUsersRepository } from './procols';

export class GetUsersController implements IController {
    constructor(private readonly getUserRepository: IGetUsersRepository) {}

    async handle() {
        try {
            const users = await this.getUserRepository.getUsers();

            return {
                statusCode: 200,
                body: users,
            };
        } catch (error) {
            console.log('Error fetching users:', error);

            return {
                statusCode: 500,
                body: 'Something went wrong',
            };
        }
    }
}
