import { DayOfMonth } from '../../shared';
import { BankPayment, OneTimePayment, Payment, RepeatPayment } from './model';

export const mapPaymentDtoToPayment = (
    payment: BankPayment | RepeatPayment | OneTimePayment,
): Payment => {
    switch (payment.payment_type) {
        case 'repeat_payment':
            return mapRepeatPaymentToPayment(payment);
        case 'one_time_payment':
            return mapOneTimePaymentToPayment(payment);
        case 'bank_payment':
            return mapBankPaymentToPayment(payment);
    }
};

const mapBankPaymentToPayment = (payment: BankPayment): Payment => {
    return {
        _id: payment._id,
        label: payment.label,
        payment_day: payment.payment_day,
        payment_amount: payment.payment_amount,
        payment_type: payment.payment_type,
        completed_at: payment.completed_at,
        payment_kind: payment.payment_kind,
        category_id: payment.category_id,
    };
};

const mapRepeatPaymentToPayment = (payment: RepeatPayment): Payment => {
    return {
        _id: payment._id,
        label: payment.label,
        payment_day: payment.payment_day,
        payment_amount: payment.payment_amount,
        payment_type: payment.payment_type,
        completed_at: payment.completed_at,
        payment_kind: payment.payment_kind,
        category_id: payment.category_id,
    };
};

const mapOneTimePaymentToPayment = (payment: OneTimePayment): Payment => {
    const payment_day = new Date(payment.payment_date).getDate() as DayOfMonth;
    return {
        _id: payment._id,
        label: payment.label,
        payment_day,
        payment_date: payment.payment_date,
        payment_amount: payment.payment_amount,
        payment_type: payment.payment_type,
        completed_at: payment.completed_at,
        payment_kind: payment.payment_kind,
        category_id: payment.category_id,
    };
};
