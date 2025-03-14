import { FC } from 'react';
import styles from './month_switcher.module.css';

type Props = {
    onDateChange: (props: { month: number; year: number }) => void;
    activeDate: { month: number; year: number };
    paymentsByMonth: Record<number, { outcome: number; income: number }>;
};

export const MonthSwitcher: FC<Props> = ({
    onDateChange,
    activeDate,
    paymentsByMonth,
}) => {
    return (
        <div className={styles.container}>
            {Object.keys(paymentsByMonth).map((month) => {
                const date = new Date();
                const currentYear = date.getFullYear();

                const parsedMonth = Number(month);
                const activeMonthCount =
                    activeDate.year > currentYear
                        ? (activeDate.year - currentYear) * 12 +
                          activeDate.month
                        : activeDate.month;

                return (
                    <label key={month} className={styles.button}>
                        <div>
                            <input
                                name="month"
                                type="radio"
                                checked={parsedMonth === activeMonthCount}
                                onChange={() => {
                                    if (parsedMonth > 12) {
                                        const years = Math.floor(
                                            parsedMonth / 12,
                                        );
                                        const months = parsedMonth % 12;

                                        if (months === 0) {
                                            return onDateChange({
                                                month: 12,
                                                year:
                                                    activeDate.year + years - 1,
                                            });
                                        }

                                        return onDateChange({
                                            month: months,
                                            year: activeDate.year + years,
                                        });
                                    }

                                    return onDateChange({
                                        month: parsedMonth,
                                        year: currentYear,
                                    });
                                }}
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
