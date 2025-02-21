import { FC } from 'react';
import styles from './user_button.module.css';

import { useAuth } from '../../context';
import { Button } from 'antd';

type Props = {
    onLogout: () => void;
};

export const UserButton: FC<Props> = ({ onLogout }) => {
    const { user, clearUser } = useAuth();

    return (
        <div>
            <div className={styles.user}>
                {user?.username}
                <Button
                    onClick={() => {
                        clearUser();
                        onLogout();
                    }}
                >
                    Выйти
                </Button>
            </div>
        </div>
    );
};
