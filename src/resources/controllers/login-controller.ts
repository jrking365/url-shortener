import { Route, Controller, Post , Body} from 'tsoa';
import bcrypt from 'bcrypt';
import { User, LoginParams } from '../users/types';
import { fetchUserByEmail } from '../users/providers/fetch-user-by-email';
import { DbUserToUser } from '../users/formatters/format-user';
import logger from '../../core-utils/logger';

@Route('login')
export class LoginController extends Controller {

    @Post()
    public async login(@Body() requestBody: LoginParams): Promise<User> {
        const {email, password} =requestBody;

        try {
            const dbUser = await fetchUserByEmail(email);
            if(!dbUser) {
                this.setStatus(401);
                throw new Error('Invalid username or password');
            }
    
            const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    
            if(!isPasswordValid) {
                this.setStatus(401);
                throw new Error('Invalid username or password');
            }
    
            this.setStatus(200);
            return DbUserToUser(dbUser);
        } catch (error) {
            logger.error(`An error occurred while logging in user`, error);
            this.setStatus(500);
            throw new Error('Internal Server Error');
        }
    }
}