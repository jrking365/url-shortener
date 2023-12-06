import { QueryResult } from "pg";
import { rawQuery } from "../../../core-utils/database";
import { UserDb } from "../types";

export function findUserById(id:string): Promise<UserDb | null>{
    return rawQuery<QueryResult<UserDb>>({
        text:`
            SELECT id, first_name, last_name, email, password, created_at, updated_at
            FROM users
            WHERE id = $1
        `,
        values: [id],
    }).then((result) => result?.rows[0]);
}