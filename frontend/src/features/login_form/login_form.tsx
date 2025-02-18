import { FC, useState } from 'react';
import { userApi } from '../../entities';
import { Controller, useForm } from 'react-hook-form';
import styles from './login_form.module.css';
import { useAuth } from '../../context';
import { Button, Form, Input, Typography, Alert } from 'antd';
const { Title } = Typography;

export const LoginForm: FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useAuth();

    const { handleSubmit, control } = useForm<{
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
            <Title level={2} style={{ textAlign: 'center' }}>
                Вход
            </Title>
            <Controller
                name="username"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                    <Form.Item label="Логин">
                        <Input size="large" {...field} />
                    </Form.Item>
                )}
            />
            <Controller
                name="password"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                    <Form.Item label="Пароль">
                        <Input.Password size="large" {...field} />
                    </Form.Item>
                )}
            />

            {error && <Alert message={error} type="error" />}

            <Button type="primary" size="large" htmlType="submit">
                Авторизоваться
            </Button>
        </form>
    );
};
