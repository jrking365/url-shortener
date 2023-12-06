import { Route, Controller, Post , Body} from 'tsoa';
import config from 'config';
import { CreateShortUrlParams } from '../types';
import { findUserById } from '../../users/providers/find-user-by-id';
import { createShortUrl } from '../services/create-short-url';
import logger from '../../../core-utils/logger';



@Route('shortener')
export class ShortenerController extends Controller {
    /**
     *Shorten a url an return the shortened url
     * Takes as params the url to be shortened and the user id
     */
    @Post()
    public async shortener(@Body() requestBody: CreateShortUrlParams): Promise<string> {
        const { url, userId } = requestBody;

        try {
             const user = await findUserById(userId);
             if(!user) {
                 this.setStatus(401);
                  return Promise.reject(Error('Invalid user'));
             }

             const shortUrl = await createShortUrl({
                url,
                userId,
             })

            this.setStatus(201);
            return `${config.shortener.baseUrl}s/${shortUrl.code}`;
          } catch (error) {
            logger.error(`An error occurred while creating url short`, error);
            this.setStatus(500);
            throw new Error('Internal Server Error');
          }
    }
}