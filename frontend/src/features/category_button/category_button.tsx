import { Alert, Button, Input, Space } from 'antd';
import { FC, useRef, useState } from 'react';
import styles from './category_button.module.css';
import { categoryApi, useCategories } from '../../entities';

export const CategoryButton: FC = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [inputValue, setInputValue] = useState('');
    const { categories, setCategories, hasCategories } = useCategories();

    const handleSubmit = async (value: string) => {
        await categoryApi.addCategory(value).then(({ _id }) => {
            setCategories([...categories, { name: value, _id: _id }]);
            setInputValue('');
        });
    };

    return (
        <>
            <Button
                onClick={() => {
                    dialogRef.current?.showModal();
                }}
            >
                Категории
            </Button>
            <dialog ref={dialogRef}>
                <section className={styles.dialog}>
                    <Space.Compact>
                        <Input
                            placeholder="Название категории"
                            allowClear
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    handleSubmit(inputValue);
                                }
                            }}
                        />
                        <Button
                            type="primary"
                            onClick={() => {
                                handleSubmit(inputValue);
                            }}
                        >
                            Добавить
                        </Button>
                    </Space.Compact>
                    <section className={styles.list}>
                        {hasCategories ? (
                            categories.map((category) => (
                                <div key={category._id} className={styles.row}>
                                    {category.name}
                                    <Button
                                        size="small"
                                        type="text"
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
                                    >
                                        🗑️
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <Alert
                                message="Пока что тут нет категорий"
                                type="info"
                            />
                        )}
                    </section>
                    <Button
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
