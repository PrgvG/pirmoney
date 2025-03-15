import { FC, useRef } from 'react';
import styles from './add_moment_payment.module.css';

import {
    CategoryField,
    LabelField,
    OneTimePayment,
    PaymentAmountField,
    paymentApi,
    PaymentKindField,
} from '../../entities';

import { nanoid } from 'nanoid';

import { useForm } from 'react-hook-form';
import { DialogTitle } from '../../components';

type Props = {
    onAdd(data: OneTimePayment): void;
};

export const AddMomentPaymentButton: FC<Props> = ({ onAdd }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const { handleSubmit, register, reset, formState } =
        useForm<OneTimePayment>({
            defaultValues: {
                payment_kind: 'outcome',
                payment_type: 'one_time_payment',
                payment_date: new Date(),
                completed_at: new Date(),
            },
        });

    const handleOpenDialog = () => {
        dialogRef.current?.showModal();
    };

    const handleCloseDialog = () => {
        dialogRef.current?.close();
    };

    const handleSubmitForm = (data: OneTimePayment) => {
        Object.assign(data, {
            _id: nanoid(),
        });
        // TODO: на catch сделать откат данных
        paymentApi.savePayment(data);
        onAdd(data);
    };

    return (
        <>
            <button type="button" onClick={handleOpenDialog}>
                Записать
            </button>

            <dialog ref={dialogRef}>
                <form
                    method="dialog"
                    className={styles.form}
                    onSubmit={handleSubmit((data) => {
                        handleSubmitForm(data);
                        reset();
                    })}
                    onReset={() => {
                        handleCloseDialog();
                        reset();
                    }}
                >
                    <DialogTitle title="Внесение платежа" />

                    <section className={styles.fields}>
                        <LabelField register={register} name="label" />

                        <PaymentAmountField
                            register={register}
                            name="payment_amount"
                        />

                        <CategoryField register={register} name="category_id" />

                        <PaymentKindField
                            register={register}
                            name="payment_kind"
                        />
                    </section>
                    <div className={styles.controls}>
                        <button type="submit" disabled={formState.isSubmitting}>
                            Добавить
                        </button>
                        <button type="reset" disabled={formState.isSubmitting}>
                            Закрыть
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
};
