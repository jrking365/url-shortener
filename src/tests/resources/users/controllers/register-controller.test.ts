import { RegisterController } from '../../../../resources/users/controllers/register-controller';
import { createUser } from '../../../../resources/users/services/create-user';
import {  User } from '../../../../resources/users/types';

jest.mock('../../../../resources/users/services/create-user', () => ({
    createUser: jest.fn(),
}));

describe('[resources | users | controllers | register-controller] ', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('given we need to test the register controller', () => {
        describe('success scenario', () => {
            it('should return the created user with a 201 status code', async () => {
                const mockedUser: User = {
                    id: '123',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'johnDoe@gmail.com',
                    password: 'hashedPassword',
                };

                (createUser as jest.Mock).mockResolvedValueOnce(mockedUser);

                const registerController = new RegisterController();

                const result = await registerController.register({
                    email: 'johnDoe@gmail.com',
                    password: 'test123',
                    firstName: 'John',
                    lastName: 'Doe',
                });
                expect(result).toEqual(mockedUser);
                expect(registerController.getStatus()).toEqual(201);
                expect(createUser).toHaveBeenCalledWith({
                    email: 'johnDoe@gmail.com',
                    password: expect.any(String),
                    firstName: 'John',
                    lastName: 'Doe',
                });
            });
        });

        describe('failure scenarios', () => {
            it('should return an internal server error with a 500 status code when createUser service fails', async () => {
                (createUser as jest.Mock).mockRejectedValueOnce(new Error('Error creating user'));

                const registerController = new RegisterController();

                await expect(registerController.register({
                    email: 'johnDoe@gmail.com',
                    password: 'test123',
                    firstName: 'John',
                    lastName: 'Doe',
                })).rejects.toThrow('Internal Server Error');

                expect(registerController.getStatus()).toEqual(500);
            });
        });
    });
});
