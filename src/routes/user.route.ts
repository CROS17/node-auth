import { Router } from 'express';
import { getByIdUser, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { login, logout } from '../controllers/auth.controller';
import { verifyAuthToken } from '../middlewares/verify-auth-token.middleware';

const router = Router();

/* Rutas de usuarios */
router.get('/:id', verifyAuthToken, getByIdUser);
router.post('/', createUser);
router.patch('/:id', verifyAuthToken, updateUser);
router.delete('/:id', verifyAuthToken, deleteUser);

/* Rutas de autenticación */
router.post('/login', login);
// Ruta de logout con middleware para verificar el token
router.post('/logout', logout);

export default router;
