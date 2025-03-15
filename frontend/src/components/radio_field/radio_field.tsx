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
} & InputHTMLAttributes<HTMLInputElement>;

export const RadioField = <T extends FieldValues>({
    register,
    name,
    label,
    registerOptions,
    options,
    labelClassName,
    ...rest
}: Props<T>) => {
    return (
        <section>
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
