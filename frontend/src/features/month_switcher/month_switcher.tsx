import { FC } from 'react';
import styles from './month_switcher.module.css';
import { Amount } from './amount';

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
    const months = Object.keys(paymentsByMonth);

    const date = new Date();
    const currentYear = date.getFullYear();

    const activeMonthCount =
        activeDate.year > currentYear
            ? (activeDate.year - currentYear) * 12 + activeDate.month
            : activeDate.month;

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                {months.map((month) => {
                    const parsedMonth = Number(month);

                    const isCurrentMonthActive =
                        parsedMonth === activeMonthCount;
                    const localeDate = new Date(0, parsedMonth).toLocaleString(
                        'ru',
                        {
                            month: 'long',
                        },
                    );
                    return (
                        <label key={month} className={styles.button}>
                            <input
                                name="month"
                                type="radio"
                                checked={isCurrentMonthActive}
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
                            {localeDate}
                        </label>
                    );
                })}
            </div>
            <Amount activeDate={activeDate} paymentsByMonth={paymentsByMonth} />
        </section>
    );
};
