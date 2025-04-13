import { FC } from 'react';
import { IconButton } from '../../components';
import { Payment } from '../../entities';
import { editPaymentEmitter } from './edit_payment';

type Props = {
    payment: Payment;
};

export const EditPaymentButton: FC<Props> = ({ payment }) => {
    return (
        <IconButton
            label="⚙️"
            onClick={() => {
                editPaymentEmitter.emit('dialog:show', payment);
            }}
        />
    );
};
