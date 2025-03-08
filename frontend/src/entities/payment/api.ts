import { mapPaymentDtoToPayment } from '.';
import { httpService } from '../../services/httpService';
import { isDayOfMonth } from '../../shared';
import { sortPaymentsByPaymentDay } from './helpers';
import { BankPayment, OneTimePayment, Payment, RepeatPayment } from './model';
import { PaymentType } from './types';

function getUrlByType(type: PaymentType) {
    switch (type) {
        case 'bank_payment':
            return '/bank_payments';
        case 'repeat_payment':
            return '/repeat_payments';
        case 'one_time_payment':
            return '/one_time_payments';

        default:
            throw new Error('Unknown payment type');
    }
}

function getSeparator(): Payment {
    const date = new Date().getDate();
    return {
        _id: 'separator',
        label: 'Сегодня',
        bank: 'sberbank',
        payment_kind: 'income',
        payment_day: isDayOfMonth(date) ? date : 1,
        payment_amount: 0,
        payment_type: 'repeat_payment',
        category_id: '',
        completed_at: null,
    };
}

async function completePayment({
    paymentId,
    paymentType,
    completed_at,
}: {
    paymentId: string;
    paymentType: PaymentType;
    completed_at: Date | null;
}) {
    try {
        return await httpService.patch(
            `${getUrlByType(paymentType)}/${paymentId}`,
            {
                completed_at,
            },
        );
    } catch (error) {
        console.error('Ошибка при завершении платежа:', error);
    }
}

async function getBankPayments(): Promise<Payment[]> {
    try {
        const bankPayments =
            await httpService.get<BankPayment[]>('/bank_payments');

        return bankPayments
            .map(mapPaymentDtoToPayment)
            .filter((payment) => payment !== null);
    } catch (error) {
        console.error('Ошибка при получении банковских платежей:', error);
        return [];
    }
}

async function getRepeatPayments(): Promise<Payment[]> {
    try {
        const bankPayments =
            await httpService.get<RepeatPayment[]>('/repeat_payments');

        return bankPayments
            .map(mapPaymentDtoToPayment)
            .filter((payment) => payment !== null);
    } catch (error) {
        console.error('Ошибка при получении повторяющихся платежей:', error);
        return [];
    }
}

async function getOneTimePayments(): Promise<Payment[]> {
    try {
        const oneTimePayments =
            await httpService.get<OneTimePayment[]>('/one_time_payments');

        return oneTimePayments
            .map(mapPaymentDtoToPayment)
            .filter((payment) => payment !== null);
    } catch (error) {
        console.error('Ошибка при получении повторяющихся платежей:', error);
        return [];
    }
}

async function getAllPayments(): Promise<Payment[]> {
    const [bankPayments, repeatPayments, oneTimePayments] = await Promise.all([
        getBankPayments(),
        getRepeatPayments(),
        getOneTimePayments(),
    ]);

    return bankPayments
        .concat(repeatPayments)
        .concat(oneTimePayments)
        .concat(getSeparator())
        .sort(sortPaymentsByPaymentDay);
}

async function deletePayment({
    paymentId,
    paymentType,
}: {
    paymentId: string;
    paymentType: PaymentType;
}) {
    try {
        return await httpService.delete(
            `${getUrlByType(paymentType)}/${paymentId}`,
        );
    } catch (error) {
        console.error('Ошибка при удалении платежа:', error);
    }
}

async function savePayment(
    payment: BankPayment | RepeatPayment | OneTimePayment,
) {
    try {
        return await httpService.post(
            getUrlByType(payment.payment_type),
            payment,
        );
    } catch (error) {
        console.error('Ошибка при сохранении платежа:', error);
    }
}

async function patchPayment(
    payment: Pick<
        Payment,
        '_id' | 'category_id' | 'payment_amount' | 'payment_type'
    >,
) {
    try {
        return await httpService.patch(
            `${getUrlByType(payment.payment_type)}/${payment._id}`,
            payment,
        );
    } catch (error) {
        console.error('Ошибка при обновлении платежа:', error);
    }
}

export const paymentApi = {
    completePayment,
    getAllPayments,
    deletePayment,
    savePayment,
    patchPayment,
};
