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
    type = 'type',
    label = 'label',
    amount = 1_000,
    date = new Date(),
    category = 'category',
    bank = 'bank',
    isSeparator,
}) => {
    if (isSeparator) {
        return (
            <div className={styles.separator}>
                <div></div>
                <div className={styles.cell}>{label}</div>
                <div className={cx(styles.cell, styles.rightAligned)}>
                    {date.toLocaleDateString('ru', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </div>
                <div></div>
            </div>
        );
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.action}>{completePaymentSlot}</div>
            <div className={styles.cell}>{type}</div>
            <div className={styles.cell}>{label}</div>
            <div className={cx(styles.cell, styles.rightAligned)}>
                {amount.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                })}
            </div>
            <div className={cx(styles.cell, styles.rightAligned)}>
                {date.toLocaleDateString('ru', {
                    month: 'long',
                    day: 'numeric',
                })}
            </div>
            <div className={styles.cell}>{category}</div>
            <div className={styles.cell}>{bank}</div>
            {editPaymentSlot}
            {deletePaymentSlot}
        </div>
    );
};
