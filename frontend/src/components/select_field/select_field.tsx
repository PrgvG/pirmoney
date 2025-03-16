import { ComponentProps } from 'react';
import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import styles from './select_field.module.css';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    label: string;
    options: { value: string; label: string }[];
    registerOptions?: RegisterOptions<T, Path<T>>;
    labelClassName?: string;
} & Omit<ComponentProps<'select'>, 'className'>;

export const SelectField = <T extends FieldValues>({
    register,
    name,
    label,
    options,
    registerOptions,
    labelClassName,
    ...rest
}: Props<T>) => (
    <label
        className={labelClassName}
        style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '300px',
        }}
    >
        {label}
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
