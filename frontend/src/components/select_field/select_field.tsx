import { ComponentProps } from 'react';
import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import styles from './select_field.module.css';
import { LabelTitle } from '../label_title/label_title';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    label: string;
    options: { value: string; label: string }[];
    registerOptions?: RegisterOptions<T, Path<T>>;
} & Omit<ComponentProps<'select'>, 'className'>;

export const SelectField = <T extends FieldValues>({
    register,
    name,
    label,
    options,
    registerOptions,
    ...rest
}: Props<T>) => (
    <label className={styles.wrapper}>
        <LabelTitle title={label} />
        <select
            className={styles.select}
            {...rest}
            {...register(name, registerOptions)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </label>
);
