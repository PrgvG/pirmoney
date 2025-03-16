import { FC, ReactNode, useState } from 'react';

import { Payment, useCategories } from '../../entities';
import styles from './payments_grid.module.css';
import { Row } from './view/row';
import { bankLabels } from '../../shared';
import { paymentTypeIcons } from '../../entities/payment/types';
import { Header } from './view/header';

type Props = {
    payments: (Payment & { payment_date: Date })[];
    renderDeleteButton(payment: Payment): ReactNode;
    renderCheckboxInput(payment: Payment): ReactNode;
    renderEditButton(payment: Payment): ReactNode;
    monthSwitcher: ReactNode;
    isCurrentMonth: boolean;
};

export const PaymentsGrid: FC<Props> = ({
    payments,
    renderDeleteButton,
    renderCheckboxInput,
    renderEditButton,
    monthSwitcher,
    isCurrentMonth,
}) => {
    const { categoriesById } = useCategories();
    const [showPrev, setShowPrev] = useState(false);

    const hasPayments =
        payments.filter((payment) => payment._id !== 'separator').length > 0;

    if (!hasPayments) {
        return <div>Пока что тут нет платежей</div>;
    }

    const { prev, next } = payments.reduce<{
        prev: (Payment & { payment_date: Date })[];
        next: (Payment & { payment_date: Date })[];
    }>(
        (acc, payment) => {
            if (!isCurrentMonth) {
                return { prev: [], next: [...acc.next, payment] };
            }
            const today = new Date().getDate();
            const isPrevPayment = payment.payment_date.getDate() < today;
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
            <div className={styles.wrapper}>{monthSwitcher}</div>

            <div className={styles.wrapper}>
                <Header />
                {showPrev &&
                    prev.map((payment) => {
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
                                category={
                                    categoriesById[payment.category_id]
                                        ? categoriesById[payment.category_id]
                                              .name
                                        : ''
                                }
                                bank={
                                    payment.bank ? bankLabels[payment.bank] : ''
                                }
                                kind={kind}
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
                            category={
                                categoriesById[payment.category_id]
                                    ? categoriesById[payment.category_id].name
                                    : ''
                            }
                            bank={payment.bank ? bankLabels[payment.bank] : ''}
                            kind={kind}
                            onSeparatorClick={
                                showPrevPayments
                                    ? () => setShowPrev((prev) => !prev)
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
