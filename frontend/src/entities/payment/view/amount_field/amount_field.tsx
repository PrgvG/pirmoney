import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { InputField } from '../../../../components';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
};

export const AmountField = <T extends FieldValues>({
    register,
    name,
}: Props<T>) => {
    return (
        <InputField
            label="Сумма платежа"
            register={register}
            name={name}
            type="number"
            step={0.01}
            min={0}
            inputMode="decimal"
            registerOptions={{ required: true }}
        />
    );
};
