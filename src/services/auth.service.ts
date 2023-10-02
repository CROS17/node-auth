import {User} from '../models/user.model';
import {generateTokenMiddleware, secretKey} from '../middlewares/generate-token.middleware';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserService} from './user.service';

class AuthService {
    private userService: UserService;
    private revokedTokens: Set<string>;

    constructor() {
        this.userService = new UserService();
        this.revokedTokens = new Set();
    }

    public async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        // Generar y devolver un token de sesión, como un token JWT
        const token = generateTokenMiddleware(user);

        return { user, token };
    }

    public async verifyToken(token: string): Promise<User | null> {
        try {
            if (this.revokedTokens.has(token)) {
                return null; // Token revocado
            }

            const decodedToken = jwt.verify(token, secretKey) as { userId: number, email: string };
            return await this.userService.getUserById(decodedToken.userId);
        } catch (error) {
            return null;
        }
    }

    public logout(token: string): void {
        this.revokedTokens.add(token);
    }

}

export default AuthService;
