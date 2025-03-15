import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { SelectField } from '../../../../components';
import { useCategories } from '../../../category/context';

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
};

export const CategoryField = <T extends FieldValues>({
    register,
    name,
}: Props<T>) => {
    const { categories, hasCategories } = useCategories();
    if (!hasCategories) {
        return null;
    }

    return (
        <SelectField
            register={register}
            name={name}
            label="Категория"
            registerOptions={{ required: true }}
            options={categories.map((category) => ({
                value: category._id,
                label: category.name,
            }))}
        />
    );
};
