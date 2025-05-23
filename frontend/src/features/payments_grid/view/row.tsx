import { FC, ReactNode } from 'react';
import styles from './row.module.css';
import cx from 'classnames';
import { TextButton } from '../../../components';

type Props = {
    completePaymentSlot?: ReactNode;
    deletePaymentSlot: ReactNode;
    editPaymentSlot: ReactNode;
    type: string;
    label: string;
    amount: number;
    date: string;
    category: string;
    kind: 'separator' | 'outcome' | 'income';
    onSeparatorClick?: () => void;
    separatorButtonLabel?: string;
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
    kind,
    onSeparatorClick,
    separatorButtonLabel,
}) => {
    const labelDate = new Date(date).toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
    });

    if (kind === 'separator') {
        return (
            <div className={styles.separator}>
                {onSeparatorClick && (
                    <TextButton onClick={onSeparatorClick}>
                        {separatorButtonLabel}
                    </TextButton>
                )}
                {label} — {labelDate}
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
            <div
                className={cx(
                    styles.cell,
                    styles.rightAligned,
                    kind === 'income' && styles.income,
                )}
            >
                {shownAmount}
            </div>
            <div className={cx(styles.cell, styles.rightAligned)}>
                {labelDate}
            </div>
            <div className={styles.cell}>{category}</div>
            {editPaymentSlot}
            {deletePaymentSlot}
        </div>
    );
};
