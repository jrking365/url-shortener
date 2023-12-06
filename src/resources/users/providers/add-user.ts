import { QueryResult } from "pg";
import { rawQuery } from "../../../core-utils/database";
import { User, UserDb } from "../types";

export async function addUser(user:Omit<User, 'id'>):Promise<UserDb> {
    return rawQuery<QueryResult<UserDb>>({
         text:`
            INSERT INTO users(first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, first_name, last_name, email, created_at, updated_at
        `,
        values: [user.firstName, user.lastName, user.email, user.password],
    }).then((result) => result?.rows[0]);

}