import bcrypt from 'bcrypt';
import { LoginController } from '../../../../resources/users/controllers/login-controller';
import {fetchUserByEmail} from '../../../../resources/users/providers/fetch-user-by-email'
import { LoginParams } from '../../../../resources/users/types';

const loginParams: LoginParams = {
    email: 'johnDoe@gmail.com',
    password: 'test123',
}


jest.mock('../../../../resources/users/providers/fetch-user-by-email', () => ({
    fetchUserByEmail: jest.fn().mockResolvedValue({
        id: '123',
        first_name: 'John',
        last_name: 'Doe',
        email: 'johnDoe@gmail.com',
        password: 'test123',
    }),
}));

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe('[resources | users | controllers | login-controller] ', () => {
    describe('given we need to test the login controller', () => {
        describe('failure scenarios', () => {
            describe('when the user does not exist in the database', () => {
                beforeAll(() => {
                    (fetchUserByEmail as jest.Mock).mockResolvedValueOnce(null);
                });

                const loginController = new LoginController();

                it('should return an error message', () =>{
                    expect.assertions(2);
                    return loginController.login(loginParams).catch((error) => {
                        expect(error.message).toEqual('Invalid username or password');
                        expect(loginController.getStatus()).toEqual(401);
                    });
                })
            });

            describe('when the password is invalid', () => {
                const loginController = new LoginController();

                it('should return an error message', () =>{
                    expect.assertions(2);
                    return loginController.login({
                        email:'johnDoe@gmail.com',
                        password: 'invalid-password',
                    }).catch((error) => {
                        expect(error.message).toEqual('Invalid username or password');
                        expect(loginController.getStatus()).toEqual(401);
                    });
                })
            });
        });
    });
});