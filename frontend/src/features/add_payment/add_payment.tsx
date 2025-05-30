import { FC, useRef, useState } from 'react';
import styles from './add_payment.module.css';
import { PaymentType, paymentTypeLabels } from '../../shared';
import {
    BankPayment,
    OneTimePayment,
    paymentApi,
    RepeatPayment,
} from '../../entities';
import { BankPaymentForm } from './components/bank_payment_form/bank_payment_form';
import { OneTimePaymentForm } from './components/one_time_payment_form/one_time_payment_form';
import { RepeatPaymentForm } from './components/repeat_payment_form/repeat_payment_form';
import { nanoid } from 'nanoid';
import { paymentTypeIcons } from '../../entities/payment/types';
import { Button, DialogTitle } from '../../components';

type Props = {
    onAdd(data: BankPayment | RepeatPayment | OneTimePayment): void;
};

const paymentTypes = [
    {
        value: 'bank_payment',
        label: `${paymentTypeIcons.bank_payment} ${paymentTypeLabels.bank_payment}`,
    },
    {
        value: 'repeat_payment',
        label: `${paymentTypeIcons.repeat_payment} ${paymentTypeLabels.repeat_payment}`,
    },
    {
        value: 'one_time_payment',
        label: `${paymentTypeIcons.one_time_payment} ${paymentTypeLabels.one_time_payment}`,
    },
];

export const AddPaymentButton: FC<Props> = ({ onAdd }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [paymentType, setPaymentType] = useState<PaymentType>('bank_payment');

    const handleOpenDialog = () => {
        dialogRef.current?.showModal();
    };

    const handleCloseDialog = () => {
        dialogRef.current?.close();
    };

    const handleSubmit = (
        data: BankPayment | RepeatPayment | OneTimePayment,
    ) => {
        Object.assign(data, {
            _id: nanoid(),
        });
        handleCloseDialog();
        paymentApi.savePayment(data);
        onAdd(data);
    };

    return (
        <>
            <Button
                className={styles.button}
                type="button"
                onClick={handleOpenDialog}
            >
                Запланировать
            </Button>

            <dialog ref={dialogRef}>
                <div className={styles.dialog}>
                    <div className={styles.wrapper}>
                        <DialogTitle title="Планирование платежа" />
                        <div className={styles.paymentTypes}>
                            {paymentTypes.map(({ value, label }) => (
                                <label key={value}>
                                    <input
                                        type="radio"
                                        value={value}
                                        checked={paymentType === value}
                                        onChange={(e) => {
                                            setPaymentType(
                                                e.target.value as PaymentType,
                                            );
                                        }}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                        {paymentType === 'repeat_payment' && (
                            <RepeatPaymentForm
                                onReset={handleCloseDialog}
                                onSubmit={handleSubmit}
                                formId="addPaymentForm"
                            />
                        )}
                        {paymentType === 'bank_payment' && (
                            <BankPaymentForm
                                onReset={handleCloseDialog}
                                onSubmit={handleSubmit}
                                formId="addPaymentForm"
                            />
                        )}
                        {paymentType === 'one_time_payment' && (
                            <OneTimePaymentForm
                                onReset={handleCloseDialog}
                                onSubmit={handleSubmit}
                                formId="addPaymentForm"
                            />
                        )}
                        <div className={styles.controls}>
                            <Button type="submit" form="addPaymentForm">
                                Добавить
                            </Button>
                            <Button type="reset" form="addPaymentForm">
                                Закрыть
                            </Button>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};
