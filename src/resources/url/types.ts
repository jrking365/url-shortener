export interface CreateShortUrlParams {
    url: string;
    userId: string;
}

export interface ShortUrl {
    id?: string;
    originalUrl: string;
    code: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ShortUrlDb {
    id?: string;
    original_url: string;
    code: string;
    user_id: string;
    created_at?: Date;
    updated_at?: Date;
}