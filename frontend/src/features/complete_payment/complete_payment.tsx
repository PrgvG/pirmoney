import { FC } from 'react';
import { Payment, paymentApi } from '../../entities';
import { Checkbox } from 'antd';

type Props = {
    payment: Payment;
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
        <Checkbox
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
