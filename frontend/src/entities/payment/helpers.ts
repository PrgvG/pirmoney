import { Payment } from './model';

export function filterByActiveDate(
    payments: Payment[],
    activeDate: { month: number; year: number },
): Payment[] {
    //TODO добавить фильтрацию по дате начала и дате конца у повторяющихся платежей
    return payments.filter((payment) => {
        if ('payment_date' in payment && payment.payment_date) {
            const paymentDate = new Date(payment.payment_date);

            return (
                paymentDate.getMonth() === activeDate.month &&
                paymentDate.getFullYear() === activeDate.year
            );
        }

        const today = new Date();

        if (
            (activeDate.month !== today.getMonth() ||
                activeDate.year !== today.getFullYear()) &&
            payment._id === 'separator'
        ) {
            return false;
        }

        return true;
    });
}

export function enrichByPaymentDate(
    payments: Payment[],
    activeDate: { month: number; year: number },
): (Payment & { payment_date: string })[] {
    return payments.map((payment) => {
        if ('payment_date' in payment && payment.payment_date) {
            return {
                ...payment,
                payment_date: payment.payment_date,
            };
        }

        const date = new Date();

        const lastDay = new Date(
            activeDate.year,
            activeDate.month + 1,
            0,
        ).getDate();

        if (payment.payment_day >= lastDay) {
            date.setFullYear(activeDate.year);
            date.setMonth(activeDate.month);
            date.setDate(lastDay);

            return {
                ...payment,
                payment_date: date.toISOString(),
            };
        }

        date.setFullYear(activeDate.year);
        date.setDate(payment.payment_day);
        date.setMonth(activeDate.month);

        return {
            ...payment,
            payment_date: date.toISOString(),
        };
    });
}

type PaymentByMonth = Record<number, { outcome: number; income: number }>;

export function getPaymentsByMonth(
    payments: Payment[],
    outcomeAmount: number,
    incomeAmount: number,
): PaymentByMonth {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    let lastMonth = todayMonth;

    const oneTimePaymentsMap = payments.reduce<PaymentByMonth>(
        (acc, payment) => {
            if ('payment_date' in payment && payment.payment_date) {
                const paymentDate = new Date(payment.payment_date);
                const month =
                    paymentDate.getMonth() +
                    (paymentDate.getFullYear() - todayYear) * 12;

                lastMonth = Math.max(lastMonth, month);

                if (month in acc) {
                    if (payment.payment_kind === 'outcome') {
                        acc[month].outcome += Number(payment.payment_amount);
                    } else {
                        acc[month].income += Number(payment.payment_amount);
                    }
                } else {
                    if (payment.payment_kind === 'outcome') {
                        acc[month] = {
                            outcome: Number(payment.payment_amount),
                            income: 0,
                        };
                    } else {
                        acc[month] = {
                            income: Number(payment.payment_amount),
                            outcome: 0,
                        };
                    }
                }
            }
            return acc;
        },
        {},
    );

    return new Array(lastMonth + 1)
        .fill(0)
        .map((_, index) => {
            if (index in oneTimePaymentsMap) {
                return {
                    outcome: outcomeAmount + oneTimePaymentsMap[index].outcome,
                    income: incomeAmount + oneTimePaymentsMap[index].income,
                };
            }
            return { outcome: outcomeAmount, income: incomeAmount };
        })
        .reduce((acc, { outcome, income }, index) => {
            return { ...acc, [index]: { outcome, income } };
        }, {});
}

export function getPaymentsSummary(payments: Payment[]): {
    outcomeAmount: number;
    closestPayment: number;
    paymentsAmountLeft: number;
    incomeAmount: number;
} {
    const todayDate = new Date().getDate();
    let closestPayment = 0;
    let paymentsAmountLeft = 0;
    let incomeAmount = 0;

    const outcomeAmount = payments.reduce((paymentAmount, payment) => {
        if ('payment_date' in payment) {
            return paymentAmount;
        }

        if (payment.payment_kind === 'income') {
            incomeAmount += Number(payment.payment_amount);
            return paymentAmount;
        }

        if (payment.payment_day >= todayDate && closestPayment === 0) {
            closestPayment = payment.payment_amount;
        }
        if (closestPayment) {
            paymentsAmountLeft += Number(payment.payment_amount);
        }
        paymentAmount += Number(payment.payment_amount);

        return paymentAmount;
    }, 0);

    return {
        outcomeAmount,
        closestPayment: closestPayment || payments[0]?.payment_amount,
        paymentsAmountLeft,
        incomeAmount,
    };
}

export function sortPaymentsByPaymentDay(a: Payment, b: Payment): 1 | -1 {
    return a.payment_day > b.payment_day ? 1 : -1;
}

export const getPaymentsByCategories = (
    payments: Payment[],
    activeDate: {
        month: number;
        year: number;
    },
): Record<string, { amount: number; payments: Payment[] }> => {
    return filterByActiveDate(payments, activeDate)
        .filter((payment) => payment.payment_kind === 'outcome')
        .reduce<Record<string, { amount: number; payments: Payment[] }>>(
            (acc, payment) => {
                if (!payment.category_id) {
                    if ('N/A' in acc) {
                        acc['N/A'] = {
                            amount: (acc['N/A'].amount += Number(
                                payment.payment_amount,
                            )),
                            payments: [...acc['N/A'].payments, payment],
                        };
                    } else {
                        acc['N/A'] = {
                            amount: Number(payment.payment_amount),
                            payments: [payment],
                        };
                    }
                } else {
                    if (payment.category_id in acc) {
                        acc[payment.category_id] = {
                            amount: (acc[payment.category_id].amount += Number(
                                payment.payment_amount,
                            )),
                            payments: [
                                ...acc[payment.category_id].payments,
                                payment,
                            ],
                        };
                    } else {
                        acc[payment.category_id] = {
                            amount: Number(payment.payment_amount),
                            payments: [payment],
                        };
                    }
                }

                return acc;
            },
            {},
        );
};
