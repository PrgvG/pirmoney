import { FC, useRef } from 'react';
import styles from './add_moment_payment.module.css';

import { OneTimePayment, paymentApi, useCategories } from '../../entities';

import { nanoid } from 'nanoid';
import { Button, Form, Input, InputNumber, Switch } from 'antd';
import { Controller, useForm } from 'react-hook-form';

type Props = {
    onAdd(data: OneTimePayment): void;
};

export const AddMomentPaymentButton: FC<Props> = ({ onAdd }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const { categories, hasCategories } = useCategories();

    const { handleSubmit, register, reset, control, formState, setValue } =
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
            <Button type="primary" onClick={handleOpenDialog}>
                Записать
            </Button>

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
                    <section>
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
                                    {...register('category_id', {
                                        required: true,
                                    })}
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
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
                    </section>
                    <div className={styles.controls}>
                        <Button htmlType="submit" type="primary">
                            Добавить
                        </Button>
                        <Button htmlType="reset">Закрыть</Button>
                    </div>
                </form>
            </dialog>
        </>
    );
};
