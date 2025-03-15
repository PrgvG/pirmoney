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
    

    return (
        
    );
};
