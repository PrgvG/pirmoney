import { FC } from 'react';
import { Payment, paymentApi } from '../../entities';
import styles from './complete_payment.module.css';

type Props = {
    payment: Payment;
    activeMonth: number;
    onChange: (completed_at: Date | null) => void;
};

export const CompletePayment: FC<Props> = ({
    activeMonth,
    payment,
    onChange,
}) => {
    function getIsPaid(paymentDate: Date | null): boolean {
        if (!paymentDate) {
            return false;
        }

        const paidMonth = new Date(paymentDate).getMonth();

        return activeMonth <= paidMonth;
    }
    const isPaid = getIsPaid(payment.completed_at);

    return (
        <input
            type="checkbox"
            className={styles.checkbox}
            checked={isPaid}
            onChange={async () => {
                const date = new Date();
                date.setMonth(activeMonth);

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
