import { FC, useState } from 'react';
import { TextButton } from '../../components';
import { Payment, useCategories } from '../../entities';
import styles from './payments_by_categories.module.css';

type Props = {
    paymentsByCategories: Record<
        string,
        { amount: number; payments: Payment[] }
    >;
};

export const PaymentsByCategories: FC<Props> = ({ paymentsByCategories }) => {
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
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
                (selectedCategory ? (
                    <div
                        className={styles.wrapper}
                        onClick={() => {
                            setSelectedCategory(null);
                        }}
                    >
                        {paymentsByCategories[selectedCategory].payments
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
                                        <div className={styles.label}>
                                            {payment.label}
                                        </div>
                                        <div className={styles.money}>
                                            {formattedAmount}
                                        </div>
                                        <div className={styles.money}>
                                            {date.toLocaleDateString('ru-RU', {
                                                day: 'numeric',
                                                month: 'short',
                                            })}
                                        </div>
                                    </section>
                                );
                            })}
                    </div>
                ) : (
                    <div className={styles.wrapper}>
                        {Object.keys(paymentsByCategories).map((categoryId) => {
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
                                        setSelectedCategory(categoryId);
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
