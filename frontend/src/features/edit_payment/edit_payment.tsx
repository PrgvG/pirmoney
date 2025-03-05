import { PatchPayment, Payment, paymentApi } from '../../entities';
import { FC, useRef, useState } from 'react';
import { Button } from 'antd';
import { EditPaymentForm } from './components/edit_payment_form/edit_payment_form';
import styles from './edit_payment.module.css';

type Props = {
    payment: Payment;
    onSave: (payment: PatchPayment) => void;
};

export const EditPayment: FC<Props> = ({ payment, onSave }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <Button
                size="small"
                type="text"
                onClick={() => {
                    dialogRef.current?.showModal();
                }}
            >
                ⚙️
            </Button>

            <dialog ref={dialogRef}>
                <EditPaymentForm
                    onReset={() => {
                        dialogRef.current?.close();
                    }}
                    onSubmit={async (data: PatchPayment) => {
                        try {
                            await paymentApi.patchPayment(data);
                            onSave(data);
                            dialogRef.current?.close();
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                    initialValues={payment}
                />
            </dialog>
        </>
    );
};
