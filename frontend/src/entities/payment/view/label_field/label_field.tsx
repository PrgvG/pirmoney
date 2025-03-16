import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { InputField } from '../../../../components';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
};

export const LabelField = <T extends FieldValues>({
    register,
    name,
}: Props<T>) => (
    <InputField
        label="Название"
        register={register}
        autoComplete="off"
        name={name}
        registerOptions={{ required: true }}
    />
);
