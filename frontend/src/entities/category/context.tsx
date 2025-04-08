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
    const [categoriesState, setCategoriesState] = useState<{
        data: Category[] | null;
        archive: Category[] | null;
        loading: Boolean;
        error: Error | null;
    }>({
        data: null,
        archive: null,
        loading: true,
        error: null,
    });

    function getCategoryNameById(
        categoryId: string | null,
        categoryById: Record<string, Category>,
    ) {
        if (!categoryId || categoryId === '—') {
            return '—';
        }

        if (!categoryById[categoryId]) {
            return '—';
        }

        return categoryById[categoryId]?.name;
    }

    useEffect(() => {
        categoryApi
            .getCategories()
            .then((categories) => {
                categories.sort((a, b) => a.name.localeCompare(b.name));

                const { data, archive } = categories.reduce<{
                    data: Category[];
                    archive: Category[];
                }>(
                    (acc, category) => {
                        if (category.status === 'active') {
                            acc.data.push(category);
                        }
                        if (category.status === 'deleted') {
                            acc.archive.push({
                                _id: category._id,
                                name: '[а] ' + category.name,
                                status: category.status,
                            });
                        }

                        return acc;
                    },
                    { data: [], archive: [] },
                );

                setCategoriesState({
                    data,
                    archive,
                    loading: false,
                    error: null,
                });
            })
            .catch((error) => {
                setCategoriesState({
                    data: null,
                    archive: null,
                    loading: false,
                    error,
                });
            });
    }, []);

    if (categoriesState.error) {
        return <div>Ошибка: {categoriesState.error.message}</div>;
    }

    if (categoriesState.loading) {
        return <div>Загружаю список категорий</div>;
    }

    if (!categoriesState.data || !categoriesState.archive) {
        return <div>Не удалось загрузить категории</div>;
    }

    const categoriesById = categoriesState.data
        .concat(categoriesState.archive)
        .reduce((acc, category) => ({ ...acc, [category._id]: category }), {});

    return (
        <CategoriesContext.Provider
            value={{
                categories: categoriesState.data,
                setCategories: (categories) =>
                    setCategoriesState((prev) => ({
                        ...prev,
                        data: categories,
                    })),
                getCategoryNameById: (categoryId) =>
                    getCategoryNameById(categoryId, categoriesById),
                hasCategories: categoriesState.data.length > 0,
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
