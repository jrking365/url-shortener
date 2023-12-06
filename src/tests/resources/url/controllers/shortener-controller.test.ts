import config from 'config';
import { ShortenerController } from  '../../../../resources/url/controllers/shortener-controller';
import { findUserById } from '../../../../resources/users/providers/find-user-by-id';
import { createShortUrl } from  '../../../../resources/url/services/create-short-url';

jest.mock('../../../../resources/users/providers/find-user-by-id', () => ({
    findUserById: jest.fn(),
}));

jest.mock('../../../../resources/url/services/create-short-url', () => ({
    createShortUrl: jest.fn(),
}));

describe('[resources | url-shortener | controllers | shortener-controller] ', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('given we need to test the shortener controller', () => {
        describe('success scenario', () => {
            it('should return the shortened URL with a 201 status code', async () => {
                // Arrange
                const mockedUser = { id: 'user123' };
                const mockedShortUrl = { code: 'abcd123' };

                (findUserById as jest.Mock).mockResolvedValueOnce(mockedUser);
                (createShortUrl as jest.Mock).mockResolvedValueOnce(mockedShortUrl);

                const shortenerController = new ShortenerController();

                const result = await shortenerController.shortener({
                    url: 'https://example.com',
                    userId: 'user123',
                });

                expect(result).toEqual(`${config.shortener.baseUrl}s/${mockedShortUrl.code}`);
                expect(shortenerController.getStatus()).toEqual(201);
                expect(findUserById).toHaveBeenCalledWith('user123');
                expect(createShortUrl).toHaveBeenCalledWith({
                    url: 'https://example.com',
                    userId: 'user123',
                });
            });
        });

        describe('failure scenarios', () => {
            it('should return an internal server error with a 500 status code when findUserById service fails', async () => {
                            
                (findUserById as jest.Mock).mockRejectedValueOnce(new Error('Error finding user'));

                const shortenerController = new ShortenerController();


                await expect(shortenerController.shortener({
                    url: 'https://example.com',
                    userId: 'user123',
                })).rejects.toThrow('Internal Server Error');

                expect(shortenerController.getStatus()).toEqual(500);
            });

            it('should return an internal server error with a 500 status code when createShortUrl service fails', async () => {

                (findUserById as jest.Mock).mockResolvedValueOnce({ id: 'user123' });
                (createShortUrl as jest.Mock).mockRejectedValueOnce(new Error('Error creating short URL'));

                const shortenerController = new ShortenerController();


                await expect(shortenerController.shortener({
                    url: 'https://example.com',
                    userId: 'user123',
                })).rejects.toThrow('Internal Server Error');

                expect(shortenerController.getStatus()).toEqual(500);
            });

            it('should return an unauthorized error with a 401 status code when user is not found', async () => {
                
                (findUserById as jest.Mock).mockResolvedValueOnce(null);

                const shortenerController = new ShortenerController();

                
                await expect(shortenerController.shortener({
                    url: 'https://example.com',
                    userId: 'user123',
                })).rejects.toThrow('Invalid user');

                expect(shortenerController.getStatus()).toEqual(401);
            });
        });
    });
});
