import { Schema, model } from 'mongoose';
import { CommonPaymentSchema } from './common_payment.js';

const RepeatPaymentSchema = new Schema();

RepeatPaymentSchema.add(CommonPaymentSchema).add({
    payment_day: { type: Number, required: true },
    payment_type: { type: String, required: true, enum: ['repeat_payment'] },
});

export const RepeatPaymentModel = model(
    'RepeatPayment',
    RepeatPaymentSchema,
    'repeat_payments',
);
