import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Category } from './model';
import { categoryApi } from './api';

const CategoriesContext = createContext<{
    categories: Category[];
    categoriesById: Record<string, Category>;
    setCategories: (categories: Category[]) => void;
    hasCategories: boolean;
} | null>(null);

const initialCategory: Category = {
    _id: 'empty',
    name: '<Без категории>',
};

export const CategoriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        categoryApi.getCategories().then((categories) => {
            categories.sort((a, b) => a.name.localeCompare(b.name));
            return setCategories([initialCategory, ...categories]);
        });
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                setCategories,
                hasCategories: categories.length > 0,
                categoriesById: categories.reduce(
                    (acc, category) => ({ ...acc, [category._id]: category }),
                    {},
                ),
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error(
            'useCategories must be used within a CategoriesProvider',
        );
    }
    return context;
};
