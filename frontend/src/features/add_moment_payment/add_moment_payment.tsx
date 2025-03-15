import { FC, useRef } from 'react';
import styles from './add_moment_payment.module.css';

import { OneTimePayment, paymentApi, useCategories } from '../../entities';

import { nanoid } from 'nanoid';
import { Button, Input, InputNumber, Switch, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
const { Title } = Typography;

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
                    <Title level={2} className={styles.title}>
                        Внесение платежа
                    </Title>
                    <section className={styles.fields}>
                        <Controller
                            name="label"
                            rules={{ required: true }}
                            control={control}
                            render={({ field }) => (
                                <label>
                                    Название:
                                    <Input
                                        size="middle"
                                        autoComplete="off"
                                        readOnly={formState.isSubmitting}
                                        {...field}
                                    />
                                </label>
                            )}
                        />
                        <Controller
                            name="payment_amount"
                            rules={{ required: true }}
                            control={control}
                            render={({ field }) => (
                                <label>
                                    Сумма платежа:
                                    <InputNumber
                                        className={styles.numberInput}
                                        size="middle"
                                        step={0.01}
                                        min={0}
                                        inputMode="decimal"
                                        readOnly={formState.isSubmitting}
                                        {...field}
                                    />
                                </label>
                            )}
                        />
                        {hasCategories && (
                            <label>
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
                        <label>
                            Тип транзакции:
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
                        </label>
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
