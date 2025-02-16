import { Schema, model } from 'mongoose';
import { CommonPaymentSchema } from './common_payment.js';

const OneTimePaymentSchema = new Schema();

OneTimePaymentSchema.add(CommonPaymentSchema).add({
    payment_date: { type: Date, required: true },
    payment_type: { type: String, required: true, enum: ['one_time_payment'] },
});

export const OneTimePaymentModel = model(
    'OneTimePayment',
    OneTimePaymentSchema,
    'one_time_payments',
);
