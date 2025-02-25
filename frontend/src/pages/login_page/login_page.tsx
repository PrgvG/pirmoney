import { FC, useState } from 'react';
import { LoginForm, RegisterForm } from '../../features';
import styles from './login_page.module.css';

export const LoginPage: FC = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    return (
        <main className={styles.container}>
            {mode === 'login' && (
                <LoginForm onChangeMode={() => setMode('register')} />
            )}
            {mode === 'register' && (
                <RegisterForm onChangeMode={() => setMode('login')} />
            )}
        </main>
    );
};
