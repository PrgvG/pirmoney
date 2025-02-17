import { ComponentPropsWithoutRef, FC, useMemo, useState } from 'react';
import {
    Payments,
    Summary,
    PageLayout,
    AddPaymentButton,
    CompletePayment,
    UserRegistrationButton,
    DeletePayment,
    MonthSwitcher,
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
import { authService } from './services/authService';

type Payments = Required<ComponentPropsWithoutRef<typeof Payments>['payments']>;

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

    const hasToken = Boolean(authService.getToken());

    if (!hasToken) {
        return (
            <div className={styles.registration_warning}>
                <UserRegistrationButton
                    onLogin={async () => {
                        const payments = await paymentApi.getAllPayments();
                        setPayments(payments);
                    }}
                    onLogout={() => setPayments([])}
                />
            </div>
        );
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
                <UserRegistrationButton
                    onLogin={async () => {
                        const payments = await paymentApi.getAllPayments();
                        setPayments(payments);
                    }}
                    onLogout={() => setPayments([])}
                />
            </div>

            {payments.length > 1 ? (
                <>
                    <Summary
                        closestPayment={closestPayment}
                        paymentsAmountLeft={paymentsAmountLeft}
                    />

                    <Payments
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
                                                payment._id !==
                                                deletingPayment._id,
                                        ),
                                    );

                                    setActiveDate(initialActiveDate);
                                }}
                            />
                        )}
                    />
                </>
            ) : (
                'Добавь новый платеж чтобы увидеть таблицу.'
            )}
        </PageLayout>
    );
};
