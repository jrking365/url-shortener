import { User, UserDb } from "../types";

export function userToDb(user: User): UserDb {
    return {
        ...(user.id && { id: user.id }),
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        ...(user.createdAt && { created_at: user.createdAt }),
        ...(user.updatedAt && { updated_at: user.updatedAt }),
    }
}

export function DbUserToUser(user: UserDb): User {
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        password: user.password,
        createdAt: user.created_at!,
        updatedAt: user.updated_at,
    }
}