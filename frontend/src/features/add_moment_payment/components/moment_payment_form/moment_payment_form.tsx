import { FC } from 'react';
import styles from './moment_payment_form.module.css';
import { Controller, useForm } from 'react-hook-form';
import { OneTimePayment, useCategories } from '../../../../entities';
import { Form, Input, InputNumber, Switch } from 'antd';

type Props = {
    formId: string;
    initialValues?: OneTimePayment;
    onSubmit: (data: OneTimePayment) => void;
    onReset: () => void;
};

export const MomentPaymentForm: FC<Props> = ({
    formId,
    onSubmit,
    onReset,
    initialValues,
}) => {
    const { categories, hasCategories } = useCategories();

    const { handleSubmit, register, reset, control, formState, setValue } =
        useForm<OneTimePayment>({
            defaultValues: initialValues || {
                payment_kind: 'outcome',
                payment_type: 'one_time_payment',
                payment_date: new Date(),
                completed_at: new Date(),
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
            <Controller
                name="label"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                    <Form.Item label="Название">
                        <Input
                            size="middle"
                            autoComplete="off"
                            readOnly={formState.isSubmitting}
                            {...field}
                        />
                    </Form.Item>
                )}
            />
            <Controller
                name="payment_amount"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                    <Form.Item label="Сумма платежа">
                        <InputNumber
                            style={{ width: '100%' }}
                            size="middle"
                            step={0.01}
                            min={0}
                            inputMode="decimal"
                            readOnly={formState.isSubmitting}
                            {...field}
                        />
                    </Form.Item>
                )}
            />

            {hasCategories && (
                <label className={styles.selectField}>
                    Категория:
                    <select
                        className={styles.select}
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

            <Form.Item label="Тип транзакции">
                <Switch
                    checkedChildren="Расход"
                    unCheckedChildren="Приход"
                    defaultChecked
                    onChange={(e) => {
                        setValue(
                            'payment_kind',
                            e.valueOf() ? 'outcome' : 'income',
                        );
                    }}
                />
            </Form.Item>
        </form>
    );
};
