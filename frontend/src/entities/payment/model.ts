import {
    Bank,
    BankPaymentType,
    DayOfMonth,
    OneTimePaymentType,
    PaymentType,
    RepeatPaymentType,
} from '../../shared';

type CommonPaymentDto = {
    _id: string;
    label: string;
    payment_amount: number;
    payment_kind: 'income' | 'outcome';
    completed_at: Date | null;
};

export type OneTimePayment = CommonPaymentDto & {
    payment_date: Date;
    payment_type: OneTimePaymentType;
};

export type RepeatPayment = CommonPaymentDto & {
    payment_day: DayOfMonth;
    payment_type: RepeatPaymentType;
};

export type BankPayment = CommonPaymentDto & {
    payment_day: DayOfMonth;
    payment_type: BankPaymentType;
    bank: Bank;
};

export type Payment = CommonPaymentDto & {
    payment_day: DayOfMonth;
    payment_type: PaymentType;
    payment_date?: Date;
    bank?: Bank;
};
