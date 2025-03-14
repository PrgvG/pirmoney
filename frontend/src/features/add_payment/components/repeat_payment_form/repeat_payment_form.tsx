import { FC } from 'react';
import styles from './repeat_payment_form.module.css';
import { useForm } from 'react-hook-form';
import { RepeatPayment, useCategories } from '../../../../entities';

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
    const { categories, hasCategories } = useCategories();

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
                    step={0.01}
                    inputMode="decimal"
                    {...register('payment_amount', {
                        required: true,
                        valueAsNumber: true,
                    })}
                />
            </label>
            <label>
                День платежа
                <input
                    type="number"
                    step={1}
                    min={1}
                    max={31}
                    inputMode="numeric"
                    {...register('payment_day', {
                        required: true,
                        valueAsNumber: true,
                    })}
                />
            </label>
            {hasCategories && (
                <label>
                    Категория
                    <select {...register('category_id', { required: true })}>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
            )}
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
