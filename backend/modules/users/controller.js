import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../index.js';
import { UserModel } from './model.js';

const generateAccessToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

class UserController {
    register = async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Все поля обязательны.');
        }

        try {
            const user = new UserModel({ username, password });
            await user.save();

            res.status(201).json({ token: generateAccessToken(user._id) });
        } catch (err) {
            if (err.code === 11000) {
                return res
                    .status(400)
                    .send('Пользователь с таким логином уже существует.');
            }
            res.status(500).send('Ошибка при регистрации пользователя.');
        }
    };

    login = async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Все поля обязательны.');
        }

        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return res
                    .status(401)
                    .send('Неверное имя пользователя или пароль.');
            }

            const validPassword = compareSync(password, user.password);
            if (!validPassword) {
                return res
                    .status(401)
                    .send('Неверное имя пользователя или пароль.');
            }

            const token = generateAccessToken(user.id);
            res.status(200).json({ token });
        } catch (err) {
            res.status(500).send({
                message: 'Ошибка при авторизации.',
                error: err,
            });
        }
    };

    getUser = async (req, res) => {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).send('Нет id пользователя.');
        }

        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(401).send('Неверный id пользователя.');
            }

            res.status(200).json({ username: user.username });
        } catch (err) {
            res.status(500).send('Ошибка при авторизации.');
        }
    };
}

export const userController = new UserController();
