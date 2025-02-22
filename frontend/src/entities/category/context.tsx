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

export const CategoriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        categoryApi.getCategories().then(setCategories);
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
