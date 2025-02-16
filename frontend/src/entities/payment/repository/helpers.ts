import { BankPayment, OneTimePayment, RepeatPayment } from '../model';
import { bankPaymentsRepository } from './bank_payments';
import { oneTimePaymentsRepository } from './one_time_payments';
import { repeatPaymentsRepository } from './repeat_payments';

export const putPaymentToRepository = async (
    payment: BankPayment | RepeatPayment | OneTimePayment,
) => {
    switch (payment.payment_type) {
        case 'repeat_payment':
            await repeatPaymentsRepository.put(payment, payment._id);
            break;
        case 'one_time_payment':
            await oneTimePaymentsRepository.put(payment, payment._id);
            break;
        case 'bank_payment':
            await bankPaymentsRepository.put(payment, payment._id);
            break;
        default:
            throw new Error('Unknown payment type');
    }
};

export const addPaymentToRepository = async (
    payment: BankPayment | RepeatPayment | OneTimePayment,
) => {
    switch (payment.payment_type) {
        case 'repeat_payment':
            await repeatPaymentsRepository.add(payment, payment._id);
            break;
        case 'one_time_payment':
            await oneTimePaymentsRepository.add(payment, payment._id);
            break;
        case 'bank_payment':
            await bankPaymentsRepository.add(payment, payment._id);
            break;
        default:
            throw new Error('Unknown payment type');
    }
};

export const delPaymentFromRepository = async (
    payment: BankPayment | RepeatPayment | OneTimePayment,
) => {
    switch (payment.payment_type) {
        case 'repeat_payment':
            await repeatPaymentsRepository.del(payment._id);
            break;
        case 'one_time_payment':
            await oneTimePaymentsRepository.del(payment._id);
            break;
        case 'bank_payment':
            await bankPaymentsRepository.del(payment._id);
            break;
        default:
            throw new Error('Unknown payment type');
    }
};
