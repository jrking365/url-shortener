import { rawQuery } from "../../../core-utils/database";
import { ShortUrl, ShortUrlDb } from "../types";


export function createUrl(url: Omit<ShortUrl, 'id'|'createdAt'|'updatedAt'>): Promise<ShortUrlDb> {
    return rawQuery<ShortUrlDb>({
        text: `
            INSERT INTO urls(original_url, code, user_id)
            VALUES ($1, $2, $3)
            RETURNING id, original_url, code, user_id, created_at, updated_at
        `,
        values: [url.originalUrl, url.code, url.userId],
    })
}