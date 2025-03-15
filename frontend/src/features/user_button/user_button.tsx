import { FC } from 'react';
import styles from './user_button.module.css';
import { useAuth } from '../../context';

type Props = {
    onLogout: () => void;
};

export const UserButton: FC<Props> = ({ onLogout }) => {
    const { user, clearUser } = useAuth();

    return (
        <div className={styles.user}>
            {user?.username}
            <button
                type="button"
                onClick={() => {
                    clearUser();
                    onLogout();
                }}
            >
                Выйти
            </button>
        </div>
    );
};
