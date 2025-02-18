import { FC, useEffect, useMemo, useState } from 'react';
import {
    PaymentsGrid,
    Summary,
    PageLayout,
    AddPaymentButton,
    CompletePayment,
    DeletePayment,
    MonthSwitcher,
    UserButton,
} from './features';
import {
    enrichByPaymentDate,
    filterByActiveDate,
    getPaymentsByMonth,
    getPaymentsSummary,
    mapPaymentDtoToPayment,
    Payment,
    paymentApi,
    sortPaymentsByPaymentDay,
} from './entities';
import styles from './App.module.css';

export const App: FC = () => {
    const today = new Date();

    const initialActiveDate = {
        month: today.getMonth(),
        year: today.getFullYear(),
    };

    const [payments, setPayments] = useState<Payment[]>([]);
    const [activeDate, setActiveDate] = useState(initialActiveDate);

    const { outcomeAmount, closestPayment, paymentsAmountLeft, incomeAmount } =
        useMemo(() => getPaymentsSummary(payments), [payments]);

    const paymentsByMonth = useMemo(
        () => getPaymentsByMonth(payments, outcomeAmount, incomeAmount),
        [payments, outcomeAmount, incomeAmount],
    );

    useEffect(() => {
        paymentApi.getAllPayments().then(setPayments);
    }, []);

    if (!payments.length) {
        return null;
    }

    return (
        <PageLayout>
            <div className={styles.container}>
                <AddPaymentButton
                    onAdd={async (payment) => {
                        setPayments((prev) =>
                            prev
                                .concat(mapPaymentDtoToPayment(payment))
                                .sort(sortPaymentsByPaymentDay),
                        );
                    }}
                />
                <UserButton onLogout={() => setPayments([])} />
            </div>
            <Summary
                closestPayment={closestPayment}
                paymentsAmountLeft={paymentsAmountLeft}
            />

            <PaymentsGrid
                monthSwitcher={
                    <MonthSwitcher
                        onDateChange={setActiveDate}
                        activeDate={activeDate}
                        paymentsByMonth={paymentsByMonth}
                    />
                }
                payments={enrichByPaymentDate(
                    filterByActiveDate(payments, activeDate),
                    activeDate,
                )}
                activeDate={activeDate}
                renderCheckboxInput={(completePayment) => (
                    <CompletePayment
                        payment={completePayment}
                        activeDate={activeDate}
                        onChange={(completed_at) =>
                            setPayments((prev) =>
                                prev.map((payment) =>
                                    payment._id === completePayment._id
                                        ? {
                                              ...payment,
                                              completed_at,
                                          }
                                        : payment,
                                ),
                            )
                        }
                    />
                )}
                renderDeleteButton={(deletingPayment) => (
                    <DeletePayment
                        payment={deletingPayment}
                        onDelete={() => {
                            setPayments((prev) =>
                                prev.filter(
                                    (payment) =>
                                        payment._id !== deletingPayment._id,
                                ),
                            );

                            setActiveDate(initialActiveDate);
                        }}
                    />
                )}
            />
        </PageLayout>
    );
};
