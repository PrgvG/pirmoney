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
    CategoryButton,
    EditPayment,
} from './features';
import {
    enrichByPaymentDate,
    filterByActiveDate,
    getFiltersByCategories,
    getPaymentsByMonth,
    getPaymentsSummary,
    mapPaymentDtoToPayment,
    Payment,
    paymentApi,
    sortPaymentsByPaymentDay,
} from './entities';
import styles from './App.module.css';
import { AddMomentPaymentButton } from './features/add_moment_payment/add_moment_payment';
import { PieChart } from './features/pie_chart/pie_chart';

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

    return (
        <PageLayout>
            <header className={styles.header}>
                <div className={styles.buttons}>
                    <AddPaymentButton
                        onAdd={async (payment) => {
                            setPayments((prev) =>
                                prev
                                    .concat(mapPaymentDtoToPayment(payment))
                                    .sort(sortPaymentsByPaymentDay),
                            );
                        }}
                    />
                    <AddMomentPaymentButton
                        onAdd={async (payment) => {
                            setPayments((prev) =>
                                prev
                                    .concat(mapPaymentDtoToPayment(payment))
                                    .sort(sortPaymentsByPaymentDay),
                            );
                        }}
                    />
                </div>
                <div className={styles.buttons}>
                    <CategoryButton />
                    <UserButton onLogout={() => setPayments([])} />
                </div>
            </header>

            {payments.length ? (
                <>
                    <div className={styles.totals}>
                        <Summary
                            closestPayment={closestPayment}
                            paymentsAmountLeft={paymentsAmountLeft}
                        />
                        <PieChart
                            paymentByCategory={getFiltersByCategories(
                                payments,
                                activeDate,
                            )}
                        />
                    </div>

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
                                                payment._id !==
                                                deletingPayment._id,
                                        ),
                                    );

                                    setActiveDate(initialActiveDate);
                                }}
                            />
                        )}
                        renderEditButton={(editingPayment) => (
                            <EditPayment
                                payment={editingPayment}
                                onSave={(patchPayment) => {
                                    setPayments((prev) =>
                                        prev.map((payment) =>
                                            payment._id === editingPayment._id
                                                ? {
                                                      ...payment,
                                                      ...patchPayment,
                                                  }
                                                : payment,
                                        ),
                                    );
                                }}
                            />
                        )}
                    />
                </>
            ) : (
                'Получаю данные...'
            )}
        </PageLayout>
    );
};
