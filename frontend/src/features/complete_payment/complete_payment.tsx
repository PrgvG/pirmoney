import { FC } from 'react';
import { paymentApi } from '../../entities';
import { PaymentType } from '../../shared';
import styles from './complete_payment.module.css';

type Props = {
    payment: {
        _id: string;
        payment_type: PaymentType;
        completed_at: Date | null;
    };
    activeDate: { month: number; year: number };
    onChange: (completed_at: Date | null) => void;
};

export const CompletePayment: FC<Props> = ({
    activeDate,
    payment,
    onChange,
}) => {
    function getIsPaid(paymentDate: Date | null): boolean {
        if (!paymentDate) {
            return false;
        }

        const paidDate = new Date(paymentDate);

        return (
            activeDate.month <= paidDate.getMonth() &&
            activeDate.year <= paidDate.getFullYear()
        );
    }
    const isPaid = getIsPaid(payment.completed_at);

    return (
        <input
            className={styles.checkbox}
            type="checkbox"
            checked={isPaid}
            onChange={async () => {
                const date = new Date();
                date.setMonth(activeDate.month);
                date.setFullYear(activeDate.year);

                const completed_at = isPaid ? null : date;

                onChange(completed_at);

                paymentApi.completePayment({
                    completed_at,
                    paymentId: payment._id,
                    paymentType: payment.payment_type,
                });
            }}
        />
    );
};
