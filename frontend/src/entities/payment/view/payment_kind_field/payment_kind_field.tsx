import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { RadioField } from '../../../../components';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
};

export const PaymentKindField = <T extends FieldValues>({
    register,
    name,
}: Props<T>) => {
    return (
        <RadioField
            register={register}
            name={name}
            label="Тип транзакции"
            registerOptions={{ required: true }}
            options={[
                { value: 'outcome', label: 'Расход' },
                { value: 'income', label: 'Приход' },
            ]}
        />
    );
};
