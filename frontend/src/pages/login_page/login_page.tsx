import { FC, useState } from 'react';
import { LoginForm, RegisterForm } from '../../features';
import styles from './login_page.module.css';
import { Button } from 'antd';

export const LoginPage: FC = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    return (
        <main className={styles.container}>
            {mode === 'login' && (
                <>
                    <LoginForm />
                    <Button onClick={() => setMode('register')} type="link">
                        Зарегистрироваться
                    </Button>
                </>
            )}
            {mode === 'register' && (
                <>
                    <RegisterForm />
                    <Button onClick={() => setMode('login')} type="link">
                        Войти
                    </Button>
                </>
            )}
        </main>
    );
};
