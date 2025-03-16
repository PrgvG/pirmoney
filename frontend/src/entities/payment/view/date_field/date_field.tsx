import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { DateField as UiDateField } from '../../../../components';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
};

export const DateField = <T extends FieldValues>({
    register,
    name,
}: Props<T>) => {
    return (
        <UiDateField
            style={{ lineHeight: '18px' }}
            label="Дата платежа"
            register={register}
            name={name}
            registerOptions={{ required: true }}
        />
    );
};
