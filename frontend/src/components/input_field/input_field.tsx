import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import { Input } from '..';
import { ComponentProps } from 'react';
import { LabelTitle } from '../label_title/label_title';
import styles from './input_field.module.css';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    label: string;
    registerOptions?: RegisterOptions<T, Path<T>>;
} & ComponentProps<typeof Input>;

export const InputField = <T extends FieldValues>({
    register,
    name,
    label,
    registerOptions,
    ...rest
}: Props<T>) => (
    <label className={styles.wrapper}>
        <LabelTitle title={label} />
        <Input {...rest} {...register(name, registerOptions)} />
    </label>
);
