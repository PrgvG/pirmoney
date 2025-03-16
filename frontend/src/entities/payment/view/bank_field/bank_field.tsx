import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { SelectField } from '../../../../components';
import { bankOptions } from '../../../../shared';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
};

export const BankField = <T extends FieldValues>({
    register,
    name,
}: Props<T>) => {
    return (
        <SelectField
            register={register}
            name={name}
            label="Банк"
            registerOptions={{ required: true }}
            options={Object.entries(bankOptions).map(([value, label]) => ({
                value: value,
                label: label,
            }))}
        />
    );
};
