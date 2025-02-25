import { FC } from 'react';
import { useCategories } from '../../../entities';
import { Cell } from './cell';

type Props = {
    categoryId: string;
};

export const CategoryCell: FC<Props> = ({ categoryId }) => {
    const { categoriesById } = useCategories();

    return <Cell>{categoriesById[categoryId]?.name}</Cell>;
};
