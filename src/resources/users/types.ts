export interface CreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserDb {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

// the following the 