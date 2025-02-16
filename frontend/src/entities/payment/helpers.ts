import { Payment } from './model';

export function filterByActiveMonth(
    payments: Payment[],
    activeMonth: number,
): Payment[] {
    return payments.filter((payment) => {
        if ('payment_date' in payment && payment.payment_date) {
            const paymentDate = new Date(payment.payment_date);
            return paymentDate.getMonth() === activeMonth;
        }

        const todayMonth = new Date().getMonth();

        if (activeMonth !== todayMonth && payment._id === 'separator') {
            return false;
        }

        return true;
    });
}

export function enrichByPaymentDate(
    payments: Payment[],
    activeMonth: number,
): (Payment & { payment_date: Date })[] {
    return payments.map((payment) => {
        if ('payment_date' in payment && payment.payment_date) {
            return {
                ...payment,
                payment_date: new Date(payment.payment_date),
            };
        }

        const date = new Date();

        date.setDate(payment.payment_day);
        date.setMonth(activeMonth);

        return {
            ...payment,
            payment_date: date,
        };
    });
}

type PaymentByMonth = Record<number, { outcome: number; income: number }>;

export function getPaymentsByMonth(
    payments: Payment[],
    outcomeAmount: number,
    incomeAmount: number,
): PaymentByMonth {
    const todayMonth = new Date().getMonth();
    let lastMonth = todayMonth;

    const oneTimePaymentsMap = payments.reduce<PaymentByMonth>(
        (acc, payment) => {
            if ('payment_date' in payment && payment.payment_date) {
                const month = new Date(payment.payment_date).getMonth();

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
            if (index < todayMonth) {
                return acc;
            }
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
