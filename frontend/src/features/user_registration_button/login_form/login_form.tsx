import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { registerUser } from './api';

export const LoginForm: FC<{
    onSubmit: (username: string) => void;
    onClose: () => void;
}> = ({ onSubmit, onClose }) => {
    const { register, handleSubmit } = useForm<{
        username: string;
        password: string;
    }>();

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(async (data) => {
                const response = await registerUser(data);
                if (response) {
                    onSubmit(response.username);
                    onClose();
                }
            })}
        >
            <label>
                Логин
                <input
                    type="text"
                    {...register('username', { required: true })}
                />
            </label>

            <label>
                Пароль
                <input
                    type="password"
                    {...register('password', { required: true })}
                />
            </label>

            <div className={styles.controls}>
                <button type="submit">Авторизоваться</button>
                <button onClick={onClose} type="reset">
                    Закрыть
                </button>
            </div>
        </form>
    );
};
