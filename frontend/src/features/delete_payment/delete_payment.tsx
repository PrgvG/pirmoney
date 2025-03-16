import { PatchPayment, Payment, paymentApi } from '../../entities';
import { FC, useRef, useState } from 'react';
import { EventEmitter } from '../../services/eventEmitter';
import styles from './delete_payment.module.css';

import { Button } from '../../components';

type Props = {
    onDelete: (payment: PatchPayment) => void;
};

export const deletePaymentEmitter = new EventEmitter<{
    'dialog:show': Payment;
}>();

export const DeletePayment: FC<Props> = ({ onDelete }) => {
    const [payment, setPayment] = useState<Payment | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    deletePaymentEmitter.on('dialog:show', (data) => {
        setPayment(data);
        dialogRef.current?.showModal();
    });

    return (
        <dialog ref={dialogRef}>
            <section className={styles.dialog}>
                Вы уверены что хотите удалить платеж: "{payment?.label}"
                <div className={styles.controls}>
                    <Button
                        type="button"
                        onClick={async () => {
                            if (payment) {
                                await paymentApi.deletePayment({
                                    paymentId: payment._id,
                                    paymentType: payment.payment_type,
                                });
                                onDelete(payment);
                                dialogRef.current?.close();
                            }
                        }}
                    >
                        Удалить
                    </Button>
                    <Button
                        type="button"
                        onClick={() => dialogRef.current?.close()}
                    >
                        Закрыть
                    </Button>
                </div>
            </section>
        </dialog>
    );
};
