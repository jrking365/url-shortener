import { Route, Controller, Post , Body} from 'tsoa';
import bcrypt from 'bcrypt';
import { CreateUserParams, User } from '../types';
import logger from '../../../core-utils/logger';
import { createUser } from '../services/create-user';



@Route('register')
export class RegisterController extends Controller {

    @Post()
    public async register(@Body() requestBody: CreateUserParams): Promise<User> {
        const { email, password, firstName, lastName } = requestBody;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const user = await createUser({
              firstName,
              lastName,
              email,
              password: hashedPassword,
            });
            console.log(user);
        
        
           this.setStatus(201);
            return user;
          } catch (error) {
            logger.error(`An error occurred while creating user`, error);
            this.setStatus(500);
            throw new Error('Internal Server Error');
          }
    }
}