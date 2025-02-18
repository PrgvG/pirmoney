import { Row } from '@tanstack/react-table';
import { Payment } from '../../../entities';

export function calculateLoanTotal(
    principal: number,
    interest: number,
    numberOfPayments: number,
) {
    // Преобразуем годовую процентную ставку в месячную
    const monthlyRate = interest / 100 / 12;
    // Общее количество платежей

    // Формула для расчета аннуитетного платежа
    const monthlyPayment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    // Полная стоимость кредита
    const totalPayment = monthlyPayment * numberOfPayments;

    // Общая сумма процентов
    const totalInterest = totalPayment - principal;

    return {
        totalPayment,
        totalInterest,
    };
}

export function isSeparatorRow(row: Row<Payment>): boolean {
    return row.original._id === 'separator';
}
