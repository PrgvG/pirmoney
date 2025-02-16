import { Schema, model } from 'mongoose';
import { CommonPaymentSchema } from './common_payment.js';

const BankPaymentSchema = new Schema();

BankPaymentSchema.add(CommonPaymentSchema).add({
    bank: { type: String, required: true },
    payment_day: { type: Number, required: true },
    payment_type: { type: String, required: true, enum: ['bank_payment'] },
});

export const BankPaymentModel = model(
    'BankPayment',
    BankPaymentSchema,
    'bank_payments',
);
