import { FC, Fragment, useState } from 'react';
import styles from './summary.module.css';
import { TextButton } from '../../components';
import { useCategories } from '../../entities';

type Props = {
    closestPayment: number;
    paymentsAmountLeft: number;
    paymentsByCategories: Record<string, number>;
};

export const Summary: FC<Props> = ({
    closestPayment,
    paymentsAmountLeft,
    paymentsByCategories,
}) => {
    const [showCategories, setShowCategories] = useState(false);
    const { categoriesById } = useCategories();
    const fullAmount = Object.values(paymentsByCategories).reduce(
        (acc, amount) => acc + amount,
        0,
    );

    return (
        <section>
            <div className={styles.container}>
                <div>Ближайший платеж:</div>
                <div className={styles.money}>
                    {closestPayment.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    })}
                </div>
                <div>Осталось в этом месяце:</div>
                <div className={styles.money}>
                    {paymentsAmountLeft.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                    })}
                </div>
            </div>
            <TextButton onClick={() => setShowCategories((prev) => !prev)}>
                {showCategories ? 'Скрыть' : 'Показать'} траты по категориям
            </TextButton>
            {showCategories && (
                <div className={styles.wrapper}>
                    {Object.keys(paymentsByCategories).map((categoryId) => {
                        const formattedAmount = paymentsByCategories[
                            categoryId
                        ].toLocaleString('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                        });
                        const percent = Math.round(
                            (paymentsByCategories[categoryId] / fullAmount) *
                                100,
                        );
                        return (
                            <Fragment key={categoryId}>
                                <span className={styles.text}>
                                    {categoriesById[categoryId].name}
                                </span>
                                <span className={styles.money}>
                                    {formattedAmount}
                                </span>
                                <span className={styles.money}>{percent}%</span>
                            </Fragment>
                        );
                    })}
                </div>
            )}
        </section>
    );
};
