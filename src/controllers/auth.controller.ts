import { Request, Response } from 'express';
import { HTTP_RESPONSE } from '../middlewares/http-response.middleware';
import AuthService from '../services/auth.service';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        res.status(HTTP_RESPONSE.OK).json({ data });
    } catch (error) {
        res.status(HTTP_RESPONSE.UNAUTHORIZED).json({ error: 'Invalid credentials' });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(HTTP_RESPONSE.UNAUTHORIZED).json({ error: 'Authorization header missing' });
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res.status(HTTP_RESPONSE.UNAUTHORIZED).json({ error: 'Token missing in authorization header' });
        }

        await authService.logout(token);
        res.status(HTTP_RESPONSE.OK).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(HTTP_RESPONSE.INTERNAL_SERVER_ERROR).json({ error: 'Logout failed' });
    }
};

