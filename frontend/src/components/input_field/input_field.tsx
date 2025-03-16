import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from 'react-hook-form';
import { Input } from '..';
import { ComponentProps } from 'react';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    label: string;
    registerOptions?: RegisterOptions<T, Path<T>>;
    labelClassName?: string;
} & ComponentProps<typeof Input>;

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
        <Input {...rest} {...register(name, registerOptions)} />
    </label>
);
