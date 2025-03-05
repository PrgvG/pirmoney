import { Router } from 'express';
import { userController } from './controller.js';
import { authMiddleware } from '../../auth_middleware.js';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user', authMiddleware, userController.getUser);

export const userRoutes = router;
