import {
    PatchPayment,
    Payment,
    paymentApi,
    useCategories,
} from '../../entities';
import { FC, useRef } from 'react';
import { EventEmitter } from '../../services/eventEmitter';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import styles from './edit_payment.module.css';

type Props = {
    onSave: (payment: PatchPayment) => void;
};

export const editPaymentEmitter = new EventEmitter<{
    'dialog:show': Payment;
}>();

export const EditPayment: FC<Props> = ({ onSave }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const { categories, hasCategories } = useCategories();

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
                <label>
                    Название
                    <input
                        type="text"
                        autoComplete="off"
                        {...register('label', { required: true })}
                    />
                </label>
                <label>
                    Сумма платежа
                    <input
                        type="number"
                        inputMode="decimal"
                        step={0.01}
                        {...register('payment_amount', {
                            required: true,
                            valueAsNumber: true,
                        })}
                    />
                </label>
                {hasCategories && (
                    <label>
                        Категория
                        <select
                            {...register('category_id', { required: true })}
                        >
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
                <div className={styles.controls}>
                    <Button
                        htmlType="submit"
                        type="primary"
                        loading={formState.isSubmitting}
                    >
                        Изменить
                    </Button>
                    <Button htmlType="reset" disabled={formState.isSubmitting}>
                        Закрыть
                    </Button>
                </div>
            </form>
        </dialog>
    );
};
