import z from 'zod';
import { CreateUserParams, User } from "../types";
import { addUser } from '../providers/add-user';
import { DbUserToUser } from '../formatters/format-user';
import logger from '../../../core-utils/logger';

export function createUser(params: CreateUserParams): Promise<User> {
    const Userschema = z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
    });

    Userschema.parse(params);

    try {
       return  addUser(params).then((user) => DbUserToUser(user));
    } catch (error : any) {
       logger.error(`an error occured while creating user ${error?.message}`);
       throw error;
    }
}