import { FC, useState } from 'react';
import { userApi } from '../../entities';
import { useForm } from 'react-hook-form';
import styles from './register_form.module.css';
import { useAuth } from '../../context';
import { InputField } from '../../components';

type Props = {
    onChangeMode: () => void;
};

export const RegisterForm: FC<Props> = ({ onChangeMode }) => {
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useAuth();

    const { handleSubmit, formState, register } = useForm<{
        username: string;
        password: string;
    }>();

    const handleRegister = async (props: {
        username: string;
        password: string;
    }) => {
        try {
            const response = await userApi.registerUser(props);

            setUser({ username: props.username }, response.token);
        } catch (error) {
            if (typeof error === 'string') {
                setError(error);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(async (data) => {
                await handleRegister(data);
            })}
        >
            <h2 style={{ textAlign: 'center' }}>Регистрация</h2>
            <InputField
                register={register}
                name="username"
                label="Логин"
                type="text"
                registerOptions={{ required: true }}
            />
            <InputField
                register={register}
                name="password"
                label="Пароль"
                type="password"
                registerOptions={{ required: true }}
            />

            {error && <div>{error}</div>}

            <button type="submit" disabled={formState.isSubmitting}>
                Зарегистрироваться
            </button>
            <button onClick={onChangeMode} disabled={formState.isSubmitting}>
                Войти
            </button>
        </form>
    );
};
