import { FC, useState } from 'react';
import { userApi } from '../../entities';
import { useForm } from 'react-hook-form';
import styles from './login_form.module.css';
import { useAuth } from '../../context';
import { Button, InputField } from '../../components';

type Props = {
    onChangeMode: () => void;
};

export const LoginForm: FC<Props> = ({ onChangeMode }) => {
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useAuth();

    const { handleSubmit, formState, register } = useForm<{
        username: string;
        password: string;
    }>();

    const handleLogin = async (props: {
        username: string;
        password: string;
    }): Promise<void> => {
        try {
            const response = await userApi.loginUser(props);

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
                await handleLogin(data);
            })}
        >
            <h2 style={{ textAlign: 'center' }}>Вход</h2>
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

            <Button type="submit" disabled={formState.isSubmitting}>
                Войти
            </Button>
            <Button onClick={onChangeMode} disabled={formState.isSubmitting}>
                Зарегистрироваться
            </Button>
        </form>
    );
};
