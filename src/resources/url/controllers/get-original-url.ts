import { Route, Controller, Get , SuccessResponse, Request} from 'tsoa';
import * as koa from 'koa';
import { findShortCode } from '../providers/find-short-code';
import logger from '../../../core-utils/logger';

@Route('/s')
export class ShortController extends Controller {

    /**
     * Redirect to the original url from the short code
     */
    @Get('{code}')
    @SuccessResponse(302, 'Redirect')
    public async getOriginalUrl(code: string, @Request() request:koa.Request){
        try {
           const shortUrl = await findShortCode(code); 

              if(!shortUrl) {
                this.setStatus(404);
                throw new Error('Not Found');
              }

            this.setStatus(302);
            request.ctx.redirect(shortUrl.original_url);
        } catch (error) {
            logger.error(`An error occurred while fetching the url`, error);

        }
    }
}
