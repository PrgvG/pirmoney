import { FC } from 'react';
import styles from './month_switcher.module.css';

type Props = {
    activeDate: { month: number; year: number };
    paymentsByMonth: Record<number, { outcome: number; income: number }>;
};

export const Amount: FC<Props> = ({ activeDate, paymentsByMonth }) => {
    const date = new Date();
    const currentYear = date.getFullYear();

    const activeMonthCount =
        activeDate.year > currentYear
            ? (activeDate.year - currentYear) * 12 + activeDate.month
            : activeDate.month;

    const localeDate = new Date(0, activeMonthCount).toLocaleString('ru', {
        month: 'long',
    });

    return (
        <div className={styles.amounts}>
            <span className={styles.date}>{localeDate}</span>
            <span className={styles.outcome}>
                {paymentsByMonth[activeMonthCount].outcome.toLocaleString(
                    'ru-RU',
                    {
                        style: 'currency',
                        currency: 'RUB',
                    },
                )}
            </span>
            <span className={styles.income}>
                {paymentsByMonth[activeMonthCount].income.toLocaleString(
                    'ru-RU',
                    {
                        style: 'currency',
                        currency: 'RUB',
                    },
                )}
            </span>
        </div>
    );
};
