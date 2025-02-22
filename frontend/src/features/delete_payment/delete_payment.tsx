import { FC } from 'react';
import { Payment, paymentApi } from '../../entities';
import { Button } from 'antd';

type Props = {
    onDelete: () => void;
    payment: Payment;
};

export const DeletePayment: FC<Props> = ({ onDelete, payment }) => {
    return (
        <Button
            size="small"
            type="text"
            onClick={async () => {
                onDelete();

                paymentApi.deletePayment({
                    paymentId: payment._id,
                    paymentType: payment.payment_type,
                });
            }}
        >
            🗑️
        </Button>
    );
};
