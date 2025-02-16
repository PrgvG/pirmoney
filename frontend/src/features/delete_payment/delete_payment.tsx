import { FC } from 'react';
import { Payment, paymentApi } from '../../entities';
import styles from './delete_payment.module.css';

type Props = {
    onDelete: () => void;
    payment: Payment;
};

export const DeletePayment: FC<Props> = ({ onDelete, payment }) => {
    return (
        <button
            className={styles.button}
            onClick={async () => {
                onDelete();

                paymentApi.deletePayment({
                    paymentId: payment._id,
                    paymentType: payment.payment_type,
                });
            }}
        >
            🗑️
        </button>
    );
};
