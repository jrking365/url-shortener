import logger from "../../../core-utils/logger";
import { toUrl } from "../formatters/db-formatter";
import { createUrl } from "../providers/create-url";
import { CreateShortUrlParams, ShortUrl } from "../types";
import {  generateUniqueShortCode } from "./generate-short-code";

export async function createShortUrl(params: CreateShortUrlParams): Promise<ShortUrl> {

    try {
        const code = await generateUniqueShortCode();

        const dbUrl = await createUrl({
            code,
            originalUrl: params.url,
            userId: params.userId,
        });

        return toUrl(dbUrl)
    } catch (error) {
        logger.error(`an error occured while creating short url `, error);
        throw error;
    }
}