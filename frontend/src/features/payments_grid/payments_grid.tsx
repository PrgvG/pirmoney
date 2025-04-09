import { FC, ReactNode, useState } from 'react';

import { Payment, useCategories } from '../../entities';
import styles from './payments_grid.module.css';
import { Row } from './view/row';
import { paymentTypeIcons } from '../../entities/payment/types';
import { Header } from './view/header';

type Props = {
    payments: (Payment & { payment_date: string })[];
    renderDeleteButton(payment: Payment): ReactNode;
    renderCheckboxInput(payment: Payment): ReactNode;
    renderEditButton(payment: Payment): ReactNode;
    monthSwitcher: ReactNode;
    isCurrentMonth: boolean;
};

const LOCAL_STORAGE_KEY = 'showPrevPayments';

export const PaymentsGrid: FC<Props> = ({
    payments,
    renderDeleteButton,
    renderCheckboxInput,
    renderEditButton,
    monthSwitcher,
    isCurrentMonth,
}) => {
    const { getCategoryNameById } = useCategories();
    const [showPrev, setShowPrev] = useState(
        localStorage.getItem(LOCAL_STORAGE_KEY) === 'true' || false,
    );

    const hasPayments =
        payments.filter((payment) => payment._id !== 'separator').length > 0;

    if (!hasPayments) {
        return <div>Пока что тут нет платежей</div>;
    }

    const { prev, next } = payments.reduce<{
        prev: (Payment & { payment_date: string })[];
        next: (Payment & { payment_date: string })[];
    }>(
        (acc, payment) => {
            if (!isCurrentMonth) {
                return { prev: [], next: [...acc.next, payment] };
            }

            const today = new Date();

            today.setHours(0, 0, 0, 0);

            const isPrevPayment =
                new Date(payment.payment_date).getTime() <= today.getTime() &&
                payment._id !== 'separator';
            if (isPrevPayment) {
                return { prev: [...acc.prev, payment], next: acc.next };
            }
            return { prev: acc.prev, next: [...acc.next, payment] };
        },
        { prev: [], next: [] },
    );

    const showPrevPayments = prev.length > 0;

    return (
        <div style={{ maxWidth: '100%' }}>
            {monthSwitcher}

            <div className={styles.wrapper}>
                <Header />
                {showPrev &&
                    prev.map((payment) => {
                        return (
                            <Row
                                completePaymentSlot={
                                    payment.payment_kind === 'outcome' &&
                                    renderCheckboxInput(payment)
                                }
                                deletePaymentSlot={renderDeleteButton(payment)}
                                editPaymentSlot={renderEditButton(payment)}
                                key={payment._id}
                                type={paymentTypeIcons[payment.payment_type]}
                                label={payment.label}
                                amount={payment.payment_amount}
                                date={payment.payment_date}
                                category={getCategoryNameById(
                                    payment.category_id,
                                )}
                                kind={payment.payment_kind}
                            />
                        );
                    })}
                {next.map((payment) => {
                    const kind =
                        payment._id === 'separator'
                            ? 'separator'
                            : payment.payment_kind;

                    return (
                        <Row
                            completePaymentSlot={
                                payment.payment_kind === 'outcome' &&
                                renderCheckboxInput(payment)
                            }
                            deletePaymentSlot={renderDeleteButton(payment)}
                            editPaymentSlot={renderEditButton(payment)}
                            key={payment._id}
                            type={paymentTypeIcons[payment.payment_type]}
                            label={payment.label}
                            amount={payment.payment_amount}
                            date={payment.payment_date}
                            category={getCategoryNameById(payment.category_id)}
                            kind={kind}
                            onSeparatorClick={
                                showPrevPayments
                                    ? () => {
                                          const newValue = !showPrev;
                                          localStorage.setItem(
                                              LOCAL_STORAGE_KEY,
                                              `${newValue}`,
                                          );

                                          return setShowPrev(newValue);
                                      }
                                    : undefined
                            }
                            separatorButtonLabel={
                                showPrev ? 'Скрыть' : 'Показать'
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};
