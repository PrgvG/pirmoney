import { FC } from 'react';
import styles from './one_time_payment_form.module.css';
import { useForm } from 'react-hook-form';
import {
    CategoryField,
    LabelField,
    OneTimePayment,
    AmountField,
    KindField,
    DateField,
} from '../../../../entities';

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
            <LabelField register={register} name="label" />

            <AmountField register={register} name="payment_amount" />

            <DateField register={register} name="payment_date" />

            <CategoryField register={register} name="category_id" />

            <KindField register={register} name="payment_kind" />
        </form>
    );
};
