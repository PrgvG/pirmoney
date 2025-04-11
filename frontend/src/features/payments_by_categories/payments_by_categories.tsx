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
                        {paymentsByCategories[selectedCategory].payments.map(
                            (payment) => {
                                const labelDate = payment.completed_at
                                    ? new Date(
                                          payment.completed_at,
                                      ).toLocaleDateString('ru', {
                                          month: 'long',
                                          day: 'numeric',
                                      })
                                    : '—';

                                const formattedAmount =
                                    payment.payment_amount.toLocaleString(
                                        'ru-RU',
                                        {
                                            style: 'currency',
                                            currency: 'RUB',
                                        },
                                    );

                                return (
                                    <section
                                        key={payment._id}
                                        className={styles.categoryRow}
                                    >
                                        <div>{payment.label}</div>
                                        <div className={styles.money}>
                                            {formattedAmount}
                                        </div>
                                        <div className={styles.money}>
                                            {labelDate}
                                        </div>
                                    </section>
                                );
                            },
                        )}
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
