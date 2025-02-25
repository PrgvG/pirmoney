export type RepeatPaymentType = 'repeat_payment';
export type BankPaymentType = 'bank_payment';
export type OneTimePaymentType = 'one_time_payment';

export type PaymentType =
    | RepeatPaymentType
    | BankPaymentType
    | OneTimePaymentType;

export const paymentTypeLabels: Record<PaymentType, string> = {
    repeat_payment: 'Повторяющийся платеж',
    bank_payment: 'Банковский платеж',
    one_time_payment: 'Единоразовый платеж',
};

export const paymentTypeIcons: Record<PaymentType, string> = {
    repeat_payment: '🔁',
    bank_payment: '🏦',
    one_time_payment: '🔂',
};
