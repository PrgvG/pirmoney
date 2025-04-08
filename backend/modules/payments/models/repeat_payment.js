import { Schema, model } from 'mongoose';
import { CommonPaymentSchema } from './common_payment.js';

const RepeatPaymentSchema = new Schema();

RepeatPaymentSchema.add(CommonPaymentSchema).add({
    payment_day: { type: Number, required: true },
    last_payment_at: { type: String, default: null },
    payment_type: { type: String, required: true, enum: ['repeat_payment'] },
});

export const RepeatPaymentModel = model(
    'RepeatPayment',
    RepeatPaymentSchema,
    'repeat_payments',
);
