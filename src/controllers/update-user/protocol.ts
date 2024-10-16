import { User } from '../../models/user';

export interface UpdateUserParams{
    firstName?: string;
    lastName?: string;
    password?: string;
    initialIncome?: number;
}

export interface IUpdateUserRepository{
    updateUser(id: string, params: UpdateUserParams): Promise<User>;
}