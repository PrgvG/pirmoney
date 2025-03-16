import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    label: string;
    registerOptions?: RegisterOptions<T, Path<T>>;
    options: { value: string; label: string }[];
    labelClassName?: string;
    direction?: 'row' | 'column';
} & InputHTMLAttributes<HTMLInputElement>;

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
                <label className={labelClassName} key={option.value}>
                    <input
                        {...rest}
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
