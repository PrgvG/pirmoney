import { FC } from 'react';
import styles from './month_switcher.module.css';

type Props = {
    onMonthChange: (month: number) => void;
    activeMonth: number;
    paymentsByMonth: Record<number, { outcome: number; income: number }>;
};

export const MonthSwitcher: FC<Props> = ({
    onMonthChange,
    activeMonth,
    paymentsByMonth,
}) => {
    return (
        <div className={styles.container}>
            {Object.keys(paymentsByMonth).map((month) => {
                const parsedMonth = Number(month);

                return (
                    <label key={month} className={styles.button}>
                        <div>
                            <input
                                name="month"
                                type="radio"
                                checked={parsedMonth === activeMonth}
                                onChange={() => onMonthChange(parsedMonth)}
                            />
                            {new Date(0, parsedMonth).toLocaleString('ru', {
                                month: 'long',
                            })}
                        </div>
                        <div className={styles.amounts}>
                            <span className={styles.outcome}>
                                {paymentsByMonth[
                                    parsedMonth
                                ].outcome.toLocaleString('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                })}
                            </span>
                            <span className={styles.income}>
                                {paymentsByMonth[
                                    parsedMonth
                                ].income.toLocaleString('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                })}
                            </span>
                        </div>
                    </label>
                );
            })}
        </div>
    );
};
