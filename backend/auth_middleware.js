import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './index.js';

export function authMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const [_, token] = req.headers.authorization.split(' ');
        if (!token) {
            return res
                .status(403)
                .json({ message: 'Пользователь не авторизован' });
        }
        const { id } = jwt.verify(token, JWT_SECRET);

        if (!id) {
            return res.status(400).send('Нет id пользователя.');
        }

        req.body.userId = id;

        next();
    } catch (e) {
        return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
}
