import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>{children}</div>
        </div>
    );
};
