import { FC } from 'react';
import styles from './one_time_payment_form.module.css';
import { useForm } from 'react-hook-form';
import { OneTimePayment, useCategories } from '../../../../entities';

type Props = {
    formId: string;
    initialValues?: OneTimePayment;
    onSubmit: (data: OneTimePayment) => void;
    onReset: () => void;
};

export const OneTimePaymentForm: FC<Props> = ({
    formId,
    onSubmit,
    onReset,
    initialValues,
}) => {
    const { categories, hasCategories } = useCategories();

    const { handleSubmit, register, reset } = useForm<OneTimePayment>({
        defaultValues: initialValues || {
            payment_kind: 'outcome',
            payment_type: 'one_time_payment',
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
                Дата платежа
                <input
                    type="date"
                    {...register('payment_date', { required: true })}
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
