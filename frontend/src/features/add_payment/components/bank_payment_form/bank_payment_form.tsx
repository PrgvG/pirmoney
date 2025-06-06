import { FC } from 'react';
import styles from './bank_payment_form.module.css';

import { useForm } from 'react-hook-form';
import {
    BankPayment,
    CategoryField,
    LabelField,
    AmountField,
    KindField,
    DayField,
} from '../../../../entities';

type Props = {
    formId: string;
    initialValues?: BankPayment;
    onSubmit: (data: BankPayment) => void;
    onReset: () => void;
};

export const BankPaymentForm: FC<Props> = ({
    formId,
    initialValues,
    onSubmit,
    onReset,
}) => {
    const { handleSubmit, register, reset } = useForm<BankPayment>({
        defaultValues: initialValues || {
            payment_kind: 'outcome',
            payment_type: 'bank_payment',
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
