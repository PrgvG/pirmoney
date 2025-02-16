import { FC, useEffect, useState } from 'react';
import { RegistrationForm } from './registration_form/registration_form';
import styles from './user_registration_button.module.css';

import { LoginForm } from './login_form/login_form';
import { httpService } from '../../services/httpService';
import { authService } from '../../services/authService';

type Props = {
    onLogin: () => void;
    onLogout: () => void;
};

export const UserRegistrationButton: FC<Props> = ({ onLogin, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    const handleLogin = (userName: string) => {
        setUserName(userName);
        onLogin();
    };

    useEffect(() => {
        const hasToken = Boolean(authService.getToken());

        const checkAuth = async () => {
            try {
                const data = await httpService.get<{ username: string }>(
                    '/user',
                );

                handleLogin(data.username);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                authService.removeToken();
            }
        };

        if (hasToken) {
            checkAuth();
        }
    }, []);

    return (
        <div>
            {userName ? (
                <div className={styles.user}>
                    {userName}
                    <button
                        className={styles.button}
                        onClick={() => {
                            authService.removeToken();
                            setUserName(null);
                            onLogout();
                        }}
                    >
                        Выйти
                    </button>
                </div>
            ) : (
                <div className={styles.buttons}>
                    <button
                        className={styles.button}
                        onClick={() => setIsOpen(true)}
                    >
                        Зарегистрироваться
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => setIsLoginOpen(true)}
                    >
                        Авторизоваться
                    </button>
                </div>
            )}
            {isOpen && (
                <dialog open={isOpen} className={styles.dialog}>
                    <RegistrationForm
                        onSubmit={handleLogin}
                        onClose={() => setIsOpen(false)}
                    />
                </dialog>
            )}

            {isLoginOpen && (
                <dialog open={isLoginOpen} className={styles.dialog}>
                    <LoginForm
                        onSubmit={handleLogin}
                        onClose={() => setIsLoginOpen(false)}
                    />
                </dialog>
            )}
        </div>
    );
};
