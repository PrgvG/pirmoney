import { UserModel } from '../users/model.js';
import { OneTimePaymentModel } from './models/one_time_payment.js';
import { compareSync } from 'bcrypt';
import { nanoid } from 'nanoid';

class PaymentController {
    createOne = async (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).send('Все поля обязательны.');
        }

        const user = await UserModel.findOne({ username: req.body.username });

        if (!user) {
            return res
                .status(400)
                .send('Пользователь с таким логином не найден.');
        }

        const validPassword = compareSync(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).send('Неверный пароль.');
        }

        const payment = new OneTimePaymentModel({
            _id: nanoid(),
            label: req.body.label,
            payment_amount: req.body.amount,
            payment_date: new Date().toISOString(),
            completed_at: new Date().toISOString(),
            status: 'active',
            userId: user._id,
            payment_kind: 'outcome',
            payment_type: 'one_time_payment',
        });
        try {
            const savedPayment = await payment.save();
            res.status(201).send(savedPayment);
        } catch (err) {
            res.status(400).send({
                message: 'Ошибка при создании платежа',
                error: err,
            });
        }
    };
}

export const momentPaymentsController = new PaymentController();
