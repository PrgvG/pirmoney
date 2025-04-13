import { FC } from 'react';
import styles from './repeat_payment_form.module.css';
import { useForm } from 'react-hook-form';
import {
    CategoryField,
    LabelField,
    AmountField,
    KindField,
    RepeatPayment,
    DayField,
} from '../../../../entities';

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
            <AmountField register={register} name="payment_amount" />

            <LabelField register={register} name="label" />

            <DayField register={register} name="payment_day" />

            <CategoryField register={register} name="category_id" />

            <KindField register={register} name="payment_kind" />
        </form>
    );
};
