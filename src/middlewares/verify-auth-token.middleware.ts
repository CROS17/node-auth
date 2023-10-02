import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from './generate-token.middleware'; // Importa el secretKey desde el middleware de generación

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token missing in authorization header' });
    }

    try {
        jwt.verify(token, secretKey); // Verifica el token utilizando el secretKey
        next(); // Token válido, continuar con la siguiente función (ruta protegida)
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
