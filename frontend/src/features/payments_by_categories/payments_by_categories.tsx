import { FC, useState } from 'react';
import { IconButton, TextButton } from '../../components';
import { Payment, useCategories } from '../../entities';
import styles from './payments_by_categories.module.css';
import { EditPaymentButton } from '../edit_payment/edit_payment_button';

type Props = {
    paymentsByCategories: Record<
        string,
        { amount: number; payments: Payment[] }
    >;
};

export const PaymentsByCategories: FC<Props> = ({ paymentsByCategories }) => {
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null,
    );
    const { getCategoryNameById } = useCategories();

    const fullAmount = Object.values(paymentsByCategories).reduce(
        (acc, { amount }) => acc + amount,
        0,
    );

    return (
        <>
            <TextButton onClick={() => setShowCategories((prev) => !prev)}>
                {showCategories ? 'Скрыть' : 'Показать'} траты по категориям
            </TextButton>
            {showCategories &&
                (selectedCategoryId ? (
                    <div className={styles.wrapper}>
                        <div className={styles.titleBlock}>
                            <span className={styles.title}>
                                {getCategoryNameById(selectedCategoryId)}
                            </span>
                            <IconButton
                                label="⏎"
                                onClick={() => {
                                    setSelectedCategoryId(null);
                                }}
                            />
                        </div>
                        {paymentsByCategories[selectedCategoryId].payments
                            .sort((a, b) => {
                                if (!a.payment_day) {
                                    return 1;
                                }
                                if (!b.payment_day) {
                                    return -1;
                                }
                                return (
                                    new Date(a.payment_day).getTime() -
                                    new Date(b.payment_day).getTime()
                                );
                            })
                            .map((payment) => {
                                const formattedAmount =
                                    payment.payment_amount.toLocaleString(
                                        'ru-RU',
                                        {
                                            style: 'currency',
                                            currency: 'RUB',
                                        },
                                    );

                                const date = new Date();

                                date.setDate(payment.payment_day);

                                return (
                                    <section
                                        key={payment._id}
                                        className={styles.categoryRow}
                                    >
                                        <div>
                                            <div className={styles.label}>
                                                {payment.label}
                                            </div>
                                            <div>{formattedAmount}</div>
                                        </div>
                                        <div className={styles.money}>
                                            {date.toLocaleDateString('ru-RU', {
                                                day: 'numeric',
                                                month: 'short',
                                            })}
                                        </div>
                                        <EditPaymentButton payment={payment} />
                                    </section>
                                );
                            })}
                    </div>
                ) : (
                    <div className={styles.wrapper}>
                        {Object.keys(paymentsByCategories)
                            .sort(
                                (a, b) =>
                                    paymentsByCategories[b].amount -
                                    paymentsByCategories[a].amount,
                            )
                            .map((categoryId) => {
                                const formattedAmount = paymentsByCategories[
                                    categoryId
                                ].amount.toLocaleString('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                });
                                const percent = Math.round(
                                    (paymentsByCategories[categoryId].amount /
                                        fullAmount) *
                                        100,
                                );
                                return (
                                    <section
                                        key={categoryId}
                                        className={styles.row}
                                        onClick={() => {
                                            setSelectedCategoryId(categoryId);
                                        }}
                                    >
                                        <span className={styles.text}>
                                            {getCategoryNameById(categoryId)}
                                        </span>
                                        <span className={styles.money}>
                                            {formattedAmount}
                                        </span>
                                        <span className={styles.money}>
                                            {percent}%
                                        </span>
                                    </section>
                                );
                            })}
                    </div>
                ))}
        </>
    );
};
