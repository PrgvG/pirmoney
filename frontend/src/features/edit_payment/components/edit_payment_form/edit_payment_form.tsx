import { FC } from 'react';
import styles from './edit_payment_form.module.css';
import { useForm } from 'react-hook-form';
import { PatchPayment, Payment, useCategories } from '../../../../entities';
import { Button } from 'antd';

type Props = {
    initialValues: Payment;
    onSubmit: (data: PatchPayment) => Promise<void>;
    onReset: () => void;
};

export const EditPaymentForm: FC<Props> = ({
    onSubmit,
    onReset,
    initialValues,
}) => {
    const { categories, hasCategories } = useCategories();

    const { handleSubmit, register, formState, reset } = useForm<PatchPayment>({
        defaultValues: {
            _id: initialValues._id,
            category_id: initialValues.category_id,
            payment_amount: initialValues.payment_amount,
            payment_type: initialValues.payment_type,
            label: initialValues.label,
        },
    });

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(async (data) => {
                await onSubmit(data);
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
                    <select {...register('category_id', { required: true })}>
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
    );
};
