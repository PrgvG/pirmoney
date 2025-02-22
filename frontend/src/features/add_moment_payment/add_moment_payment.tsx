import { FC, useRef } from 'react';
import styles from './add_moment_payment.module.css';

import { OneTimePayment, paymentApi } from '../../entities';

import { OneTimePaymentForm } from './components/one_time_payment_form/one_time_payment_form';

import { nanoid } from 'nanoid';
import { Button } from 'antd';

type Props = {
    onAdd(data: OneTimePayment): void;
};

export const AddMomentPaymentButton: FC<Props> = ({ onAdd }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleOpenDialog = () => {
        dialogRef.current?.showModal();
    };

    const handleCloseDialog = () => {
        dialogRef.current?.close();
    };

    const handleSubmit = (data: OneTimePayment) => {
        Object.assign(data, {
            _id: nanoid(),
        });
        handleCloseDialog();
        paymentApi.savePayment(data);
        onAdd(data);
    };

    return (
        <>
            <Button type="primary" onClick={handleOpenDialog}>
                Добавить совершенный платеж
            </Button>

            <dialog ref={dialogRef}>
                <div className={styles.dialog}>
                    <OneTimePaymentForm
                        onReset={handleCloseDialog}
                        onSubmit={handleSubmit}
                        formId="addMomentPaymentForm"
                    />

                    <div className={styles.controls}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            form="addMomentPaymentForm"
                        >
                            Добавить
                        </Button>
                        <Button htmlType="reset" form="addMomentPaymentForm">
                            Отменить
                        </Button>
                    </div>
                </div>
            </dialog>
        </>
    );
};
