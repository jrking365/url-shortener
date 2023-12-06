import { ShortUrl, ShortUrlDb } from "../types";

export function toUrl(dbUrl:ShortUrlDb): ShortUrl{
    return {
        id: dbUrl.id,
        code: dbUrl.code,
        originalUrl: dbUrl.original_url,
        userId: dbUrl.user_id,
        createdAt: dbUrl.created_at,
        updatedAt: dbUrl.updated_at,
    }
}