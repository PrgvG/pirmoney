import { FC } from 'react';
import { IconButton } from '../../components';
import { Payment } from '../../entities';
import { deletePaymentEmitter } from './delete_payment';

type Props = {
    payment: Payment;
};

export const DeletePaymentButton: FC<Props> = ({ payment }) => {
    return (
        <IconButton
            label="🗑️"
            onClick={() => {
                deletePaymentEmitter.emit('dialog:show', payment);
            }}
        />
    );
};
