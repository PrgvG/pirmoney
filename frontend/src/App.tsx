import { FC, useEffect, useMemo, useState } from 'react';
import {
    PaymentsGrid,
    Summary,
    PageLayout,
    AddPaymentButton,
    CompletePayment,
    MonthSwitcher,
    UserButton,
    CategoryButton,
    EditPayment,
    DeletePayment,
    PaymentsByCategories,
    AddMomentPaymentButton,
    EditPaymentButton,
    DeletePaymentButton,
} from './features';
import {
    enrichByPaymentDate,
    filterByActiveDate,
    getPaymentsByCategories,
    getPaymentsByMonth,
    getPaymentsSummary,
    mapPaymentDtoToPayment,
    Payment,
    paymentApi,
    sortPaymentsByPaymentDay,
} from './entities';
import styles from './App.module.css';
import { IconButton } from './components';

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

    const handleLoadPayments = async () => {
        const payments = await paymentApi.getAllPayments();
        setPayments(payments);
    };

    useEffect(() => {
        handleLoadPayments();
    }, []);

    return (
        <PageLayout>
            <header className={styles.header}>
                <div className={styles.headerActions}>
                    <IconButton label="🔄" onClick={handleLoadPayments} />
                    <CategoryButton />
                </div>
                <UserButton onLogout={() => setPayments([])} />
            </header>
            {payments.length > 0 ? (
                <>
                    <section>
                        <Summary
                            closestPayment={closestPayment}
                            paymentsAmountLeft={paymentsAmountLeft}
                        />
                        <PaymentsByCategories
                            paymentsByCategories={getPaymentsByCategories(
                                payments,
                                activeDate,
                            )}
                        />
                    </section>

                    <PaymentsGrid
                        isCurrentMonth={activeDate.month === today.getMonth()}
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
                        renderDeleteButton={(payment) => (
                            <DeletePaymentButton payment={payment} />
                        )}
                        renderEditButton={(payment) => (
                            <EditPaymentButton payment={payment} />
                        )}
                    />
                </>
            ) : (
                'Получаю данные...'
            )}
            <footer className={styles.footer}>
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
            </footer>
            <EditPayment
                onSave={(patchPayment) => {
                    setPayments((prev) =>
                        prev.map((payment) =>
                            payment._id === patchPayment._id
                                ? {
                                      ...payment,
                                      ...patchPayment,
                                  }
                                : payment,
                        ),
                    );
                }}
            />
            <DeletePayment
                onDelete={(patchPayment) => {
                    setPayments((prev) =>
                        prev.filter(
                            (payment) => payment._id !== patchPayment._id,
                        ),
                    );
                }}
            />
        </PageLayout>
    );
};
