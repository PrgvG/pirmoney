import { BankPaymentModel } from './models/bank_payment.js';
import { OneTimePaymentModel } from './models/one_time_payment.js';
import { RepeatPaymentModel } from './models/repeat_payment.js';

class PaymentController {
    Model;

    constructor(model) {
        this.Model = model;
    }

    getAll = async (req, res) => {
        const { userId } = req.body;

        try {
            const payments = await this.Model.find({
                userId,
                status: 'active',
            });
            res.status(200).send(payments);
        } catch (err) {
            res.status(500).send({
                message: 'Ошибка при получении платежей',
                error: err,
            });
        }
    };

    createOne = async (req, res) => {
        const payment = new this.Model(req.body);

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

    updateOne = async (req, res) => {
        const { id, ...restBody } = req.body;

        try {
            const updatedPayment = await this.Model.findByIdAndUpdate(
                id,
                { ...restBody },
                { new: true, runValidators: true },
            );

            if (!updatedPayment) {
                return res.status(404).send({ message: 'Платеж не найден' });
            }

            res.status(200).send(updatedPayment);
        } catch (err) {
            res.status(400).send({
                message: 'Ошибка при обновлении платежа',
                error: err,
            });
        }
    };

    patchOne = async (req, res) => {
        const { id, ...restBody } = req.body;

        try {
            const updatedPayment = await this.Model.findByIdAndUpdate(
                id,
                { $set: restBody },
                { new: true, runValidators: true },
            );

            if (!updatedPayment) {
                return res.status(404).send({ message: 'Платеж не найден' });
            }

            res.status(200).send(updatedPayment);
        } catch (err) {
            res.status(400).send({
                message: 'Ошибка при обновлении платежа',
                error: err,
            });
        }
    };
    deleteOne = async (req, res) => {
        const { id } = req.params;

        try {
            const updatedPayment = await this.Model.findByIdAndUpdate(
                id,
                { $set: { status: 'deleted', deleted_at: Date.now() } },
                { new: true, runValidators: true },
            );

            if (!updatedPayment) {
                return res.status(404).send({ message: 'Платеж не найден' });
            }

            res.status(200).send({ message: 'Платеж успешно удален' });
        } catch (err) {
            res.status(500).send({
                message: 'Ошибка при удалении платежа',
                error: err,
            });
        }
    };
}

export const bankPaymentsController = new PaymentController(BankPaymentModel);
export const oneTimePaymentsController = new PaymentController(
    OneTimePaymentModel,
);
export const repeatPaymentsController = new PaymentController(
    RepeatPaymentModel,
);
