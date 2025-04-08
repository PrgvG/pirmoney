import { Schema, model } from 'mongoose';
import { CommonPaymentSchema } from './common_payment.js';

const BankPaymentSchema = new Schema();

BankPaymentSchema.add(CommonPaymentSchema).add({
    payment_day: { type: Number, required: true },
    last_payment_at: { type: String, default: null },
    payment_type: { type: String, required: true, enum: ['bank_payment'] },
});

export const BankPaymentModel = model(
    'BankPayment',
    BankPaymentSchema,
    'bank_payments',
);
