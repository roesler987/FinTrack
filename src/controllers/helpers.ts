
import { HttpResponse } from "./protocols";
import { User } from "../models/user";

export const ok = (body: User | string): HttpResponse<User | string> => ({ 
    statusCode: 200, body });

export const created = (body: User | string): HttpResponse<User | string> => ({ 
    statusCode: 201, body });

export const badRequest = (message: string): HttpResponse<string> => {
    return {
        statusCode: 400,
        body: message,
    };
};
