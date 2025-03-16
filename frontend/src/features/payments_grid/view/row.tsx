import { FC, ReactNode } from 'react';
import styles from './row.module.css';
import cx from 'classnames';

type Props = {
    completePaymentSlot: ReactNode;
    deletePaymentSlot: ReactNode;
    editPaymentSlot: ReactNode;
    type: string;
    label: string;
    amount: number;
    date: Date;
    category: string;
    bank: string;
    isSeparator: boolean;
};

export const Row: FC<Props> = ({
    completePaymentSlot,
    deletePaymentSlot,
    editPaymentSlot,
    type,
    label,
    amount,
    date,
    category,
    bank,
    isSeparator,
}) => {
    const labelDate = date.toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    if (isSeparator) {
        return (
            <div className={styles.separator}>
                <div className={styles.cell}>
                    {label} — {labelDate}
                </div>
            </div>
        );
    }
    const shownAmount = amount.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.action}>{completePaymentSlot}</div>
            <div className={styles.cell}>{type}</div>
            <div className={styles.cell} title={label}>
                {label}
            </div>
            <div className={cx(styles.cell, styles.rightAligned)}>
                {shownAmount}
            </div>
            <div className={cx(styles.cell, styles.rightAligned)}>
                {labelDate}
            </div>
            <div className={styles.cell}>{category}</div>
            <div className={styles.cell}>{bank}</div>
            {editPaymentSlot}
            {deletePaymentSlot}
        </div>
    );
};
