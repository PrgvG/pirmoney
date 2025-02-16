import { FC } from 'react';
import styles from './repeat_payment_form.module.css';
import { useForm } from 'react-hook-form';
import { RepeatPayment } from '../../../../entities';

type Props = {
    formId: string;
    initialValues?: RepeatPayment;
    onSubmit: (data: RepeatPayment) => void;
    onReset: () => void;
};

export const RepeatPaymentForm: FC<Props> = ({
    formId,
    onSubmit,
    onReset,
    initialValues,
}) => {
    const { handleSubmit, register, reset } = useForm<RepeatPayment>({
        defaultValues: initialValues || {
            payment_kind: 'outcome',
            payment_type: 'repeat_payment',
        },
    });

    return (
        <form
            id={formId}
            className={styles.form}
            onSubmit={handleSubmit((data) => {
                onSubmit(data);
                reset();
            })}
            onReset={() => {
                onReset();
                reset();
            }}
        >
            <label>
                Название
                <input type="text" {...register('label', { required: true })} />
            </label>
            <label>
                Сумма платежа
                <input
                    type="number"
                    step={0.01}
                    {...register('payment_amount', { required: true })}
                />
            </label>
            <label>
                День платежа
                <input
                    type="number"
                    step={1}
                    min={1}
                    max={31}
                    {...register('payment_day', { required: true })}
                />
            </label>
            <div className={styles.paymentKind}>
                Тип транзакции
                <div className={styles.radioGroup}>
                    <label className={styles.radio}>
                        <input
                            defaultChecked
                            type="radio"
                            value="outcome"
                            {...register('payment_kind', { required: true })}
                        />
                        Расход
                    </label>
                    <label className={styles.radio}>
                        <input
                            type="radio"
                            value="income"
                            {...register('payment_kind', { required: true })}
                        />
                        Приход
                    </label>
                </div>
            </div>
        </form>
    );
};
