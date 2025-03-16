import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import { ComponentProps } from 'react';
import styles from './radio_field.module.css';
type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    label: string;
    registerOptions?: RegisterOptions<T, Path<T>>;
    options: { value: string; label: string }[];
    labelClassName?: string;
    direction?: 'row' | 'column';
} & Omit<ComponentProps<'input'>, 'type' | 'value' | 'className'>;

export const RadioField = <T extends FieldValues>({
    register,
    name,
    label,
    registerOptions,
    options,
    labelClassName,
    direction = 'column',
    ...rest
}: Props<T>) => {
    return (
        <section style={{ display: 'flex', flexDirection: direction }}>
            {options.map((option) => (
                <label className={styles.label} key={option.value}>
                    <input
                        {...rest}
                        className={styles.radio}
                        type="radio"
                        value={option.value}
                        {...register(name, registerOptions)}
                    />
                    {option.label}
                </label>
            ))}
        </section>
    );
};
