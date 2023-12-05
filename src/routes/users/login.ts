import express, {Request, Response} from "express";
import bcrypt from "bcrypt";
import { fetchUserByEmail } from "../../resources/users/providers/fetch-user-by-email";
import { DbUserToUser } from "../../resources/users/formatters/format-user";
import logger from "../../core-utils/logger";

const router =  express.Router();

router.post('/login', async (req:Request, res:Response) => {

    const {username, password} = req.body;

    try {
        const dbUser = await fetchUserByEmail(username);
        if(!dbUser) {
            return res.status(401).send('Invalid username or password');
        }

        const isPasswordValid = await bcrypt.compare(password, dbUser.password);

        if(!isPasswordValid) {
            return res.status(401).send('Invalid username or password');
        }

        return res.status(200).send(DbUserToUser(dbUser));
    } catch (error) {
        logger.error(`An error occurred while logging in user`, error);
        return res.status(500).send(error);
    }
})