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
    getCategoryNameById: (categoryId: string | null) => string;
} | null>(null);

export const CategoriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    function getCategoryNameById(
        categoryId: string | null,
        categoryById: Record<string, Category>,
    ) {
        if (!categoryId) {
            return '—';
        }
        return categoryById[categoryId].name;
    }

    useEffect(() => {
        categoryApi.getCategories().then((categories) => {
            categories.sort((a, b) => a.name.localeCompare(b.name));
            return setCategories(categories);
        });
    }, []);

    const categoriesById = categories.reduce(
        (acc, category) => ({ ...acc, [category._id]: category }),
        {},
    );

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                setCategories,
                getCategoryNameById: (categoryId) =>
                    getCategoryNameById(categoryId, categoriesById),
                hasCategories: categories.length > 0,
                categoriesById,
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
