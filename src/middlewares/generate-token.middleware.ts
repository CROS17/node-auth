import jwt from 'jsonwebtoken';
import {User} from '../models/user.model';
import crypto from 'crypto';

const generateSecretKey = (): string => {
    return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

export const generateTokenMiddleware = (user: User): string => {
    const payload = {
        userId: user.id,
        email: user.email,
        // Otros datos del usuario que desees incluir en el token
    };

    const options = {
        expiresIn: '1h', // Tiempo de expiración del token
    };

    return jwt.sign(payload, secretKey, options);
};

export { secretKey };
