import { QueryResult } from "pg";
import { rawQuery } from "../../../core-utils/database";
import { UserDb } from "../types";

export function fetchUserByEmail(email:string): Promise<UserDb | null>{
    return rawQuery<QueryResult<UserDb>>({
        text:`
            SELECT id, first_name, last_name, email, password, created_at, updated_at
            FROM users
            WHERE email = $1
        `,
        values: [email],
    }).then((result) => result?.rows[0]);
}