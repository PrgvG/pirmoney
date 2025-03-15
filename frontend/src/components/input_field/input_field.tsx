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
    labelClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField = <T extends FieldValues>({
    register,
    name,
    label,
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
        <input {...rest} {...register(name, registerOptions)} />
    </label>
);
