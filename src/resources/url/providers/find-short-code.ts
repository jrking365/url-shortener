import { QueryResult } from "pg";
import { rawQuery } from "../../../core-utils/database";
import { ShortUrlDb } from "../types";

export function findShortCode(code:string): Promise<ShortUrlDb>{
   return rawQuery<QueryResult<ShortUrlDb>>({
    text: 'SELECT id, original_url, code, user_id, created_at, updated_at FROM urls WHERE code = $1',
    values: [code],
   }).then((result) => result?.rows[0]);
}