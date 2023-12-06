export interface CreateShortUrlParams {
    url: string;
    userId: string;
}

export interface ShortUrl {
    id?: string;
    originalUrl: string;
    shortUrl: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ShortUrlDb {
    id?: string;
    original_url: string;
    short_url: string;
    user_id: string;
    created_at?: Date;
    updated_at?: Date;
}