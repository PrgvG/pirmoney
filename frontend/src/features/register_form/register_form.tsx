import { FC, useState } from 'react';
import { userApi } from '../../entities';
import { Controller, useForm } from 'react-hook-form';
import styles from './register_form.module.css';
import { useAuth } from '../../context';
import { Alert, Button, Form, Input, Typography } from 'antd';
const { Title } = Typography;

type Props = {
    onChangeMode: () => void;
};

export const RegisterForm: FC<Props> = ({ onChangeMode }) => {
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useAuth();

    const { handleSubmit, control, formState } = useForm<{
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
            <Title level={2} style={{ textAlign: 'center' }}>
                Регистрация
            </Title>
            <Controller
                name="username"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                    <Form.Item label="Логин">
                        <Input
                            size="large"
                            readOnly={formState.isSubmitting}
                            {...field}
                        />
                    </Form.Item>
                )}
            />
            <Controller
                name="password"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                    <Form.Item label="Пароль">
                        <Input.Password
                            size="large"
                            readOnly={formState.isSubmitting}
                            {...field}
                        />
                    </Form.Item>
                )}
            />

            {error && <Alert message={error} type="error" />}

            <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={formState.isSubmitting}
            >
                Зарегистрироваться
            </Button>
            <Button
                onClick={onChangeMode}
                type="link"
                disabled={formState.isSubmitting}
            >
                Войти
            </Button>
        </form>
    );
};
