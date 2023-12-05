import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser } from '../../resources/users/services/create-user';
import logger from '../../core-utils/logger';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      firstName,
      lastName,
      email: username,
      password: hashedPassword,
    });


    res.status(201).send(user);
  } catch (error) {
    logger.error(`An error occurred while creating user`, error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
