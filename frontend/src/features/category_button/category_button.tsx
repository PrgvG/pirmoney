import { FC, useRef, useState } from 'react';
import styles from './category_button.module.css';
import { categoryApi, useCategories } from '../../entities';
import { Button, IconButton, Input } from '../../components';

export const CategoryButton: FC = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [inputValue, setInputValue] = useState('');
    const { categories, setCategories, hasCategories } = useCategories();

    const handleSubmit = async (value: string) => {
        await categoryApi.addCategory(value).then(({ _id }) => {
            setCategories([
                ...categories,
                { name: value, _id: _id, status: 'active' },
            ]);
            setInputValue('');
        });
    };

    return (
        <>
            <Button
                type="button"
                onClick={() => {
                    dialogRef.current?.showModal();
                }}
            >
                Категории
            </Button>
            <dialog ref={dialogRef}>
                <section className={styles.dialog}>
                    <section>
                        <Input
                            placeholder="Название категории"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleSubmit(inputValue);
                                }
                            }}
                        />
                        <Button
                            type="button"
                            onClick={() => {
                                handleSubmit(inputValue);
                            }}
                        >
                            Добавить
                        </Button>
                    </section>

                    <section className={styles.list}>
                        {hasCategories ? (
                            categories.map((category) => (
                                <div key={category._id} className={styles.row}>
                                    {category.name}
                                    <IconButton
                                        label="🗑️"
                                        onClick={async () => {
                                            await categoryApi.delCategory(
                                                category._id,
                                            );
                                            setCategories(
                                                categories.filter(
                                                    (c) =>
                                                        c._id !== category._id,
                                                ),
                                            );
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div>Пока что тут нет категорий</div>
                        )}
                    </section>
                    <Button
                        style={{ alignSelf: 'flex-end' }}
                        type="button"
                        onClick={() => {
                            dialogRef.current?.close();
                            setInputValue('');
                        }}
                    >
                        Закрыть
                    </Button>
                </section>
            </dialog>
        </>
    );
};
