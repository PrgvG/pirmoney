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
    editPaymentEmitter,
    deletePaymentEmitter,
    DeletePayment,
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
import { AddMomentPaymentButton } from './features/add_moment_payment/add_moment_payment';

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
                    <Summary
                        closestPayment={closestPayment}
                        paymentsAmountLeft={paymentsAmountLeft}
                        paymentsByCategories={getPaymentsByCategories(
                            payments,
                            activeDate,
                        )}
                    />

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
                            <button
                                type="button"
                                className={styles.iconButton}
                                onClick={() => {
                                    deletePaymentEmitter.emit(
                                        'dialog:show',
                                        payment,
                                    );
                                }}
                            >
                                🗑️
                            </button>
                        )}
                        renderEditButton={(payment) => (
                            <button
                                type="button"
                                className={styles.iconButton}
                                onClick={() => {
                                    editPaymentEmitter.emit(
                                        'dialog:show',
                                        payment,
                                    );
                                }}
                            >
                                ⚙️
                            </button>
                        )}
                    />
                </>
            ) : (
                'Получаю данные...'
            )}
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
