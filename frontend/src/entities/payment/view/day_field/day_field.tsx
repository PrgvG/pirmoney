import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { InputField } from '../../../../components';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
};

export const DayField = <T extends FieldValues>({
    register,
    name,
}: Props<T>) => {
    return (
        <InputField
            label="День платежа"
            register={register}
            name={name}
            type="number"
            step={1}
            min={1}
            max={31}
            inputMode="numeric"
            registerOptions={{ required: true }}
        />
    );
};
