import { FC } from 'react';
import styles from './summary.module.css';

type Props = {
    closestPayment: number;
    paymentsAmountLeft: number;
};

export const Summary: FC<Props> = ({ closestPayment, paymentsAmountLeft }) => {
    return (
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
    );
};
