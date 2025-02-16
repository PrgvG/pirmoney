import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './registration_form.module.css';
import { registerUser } from './api';

export const RegistrationForm: FC<{
    onSubmit: (username: string) => void;
    onClose: () => void;
}> = ({ onSubmit, onClose }) => {
    const [registrationError, setRegistrationError] = useState<string | null>(
        null,
    );
    const { register, handleSubmit } = useForm<{
        username: string;
        password: string;
    }>();

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(async (data) => {
                try {
                    const response = await registerUser(data);
                    if (response) {
                        onSubmit(response.username);
                        onClose();
                    }
                } catch (error) {
                    if (typeof error === 'string') {
                        setRegistrationError(error);
                    }
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

            {registrationError && (
                <div className={styles.error}>{registrationError}</div>
            )}

            <div className={styles.controls}>
                <button type="submit">Зарегистрироваться</button>
                <button onClick={onClose} type="reset">
                    Закрыть
                </button>
            </div>
        </form>
    );
};
