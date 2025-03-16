import {
    CategoryField,
    LabelField,
    PatchPayment,
    Payment,
    PaymentAmountField,
    paymentApi,
} from '../../entities';
import { FC, useRef } from 'react';
import { EventEmitter } from '../../services/eventEmitter';
import { useForm } from 'react-hook-form';
import styles from './edit_payment.module.css';
import { Button, DialogTitle } from '../../components';

type Props = {
    onSave: (payment: PatchPayment) => void;
};

export const editPaymentEmitter = new EventEmitter<{
    'dialog:show': Payment;
}>();

export const EditPayment: FC<Props> = ({ onSave }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const { handleSubmit, register, formState, reset } = useForm<PatchPayment>(
        {},
    );

    editPaymentEmitter.on('dialog:show', (data) => {
        reset(data);
        dialogRef.current?.showModal();
    });

    return (
        <dialog ref={dialogRef}>
            <form
                className={styles.form}
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await paymentApi.patchPayment(data);
                        onSave(data);
                        dialogRef.current?.close();
                    } catch (error) {
                        console.error(error);
                    }
                })}
                onReset={() => {
                    dialogRef.current?.close();
                    reset();
                }}
            >
                <DialogTitle title="Редактирование платежа" />

                <section className={styles.fields}>
                    <LabelField register={register} name="label" />

                    <PaymentAmountField
                        register={register}
                        name="payment_amount"
                    />

                    <CategoryField register={register} name="category_id" />
                </section>
                <div className={styles.controls}>
                    <Button type="submit" disabled={formState.isSubmitting}>
                        Изменить
                    </Button>
                    <Button type="reset" disabled={formState.isSubmitting}>
                        Закрыть
                    </Button>
                </div>
            </form>
        </dialog>
    );
};
