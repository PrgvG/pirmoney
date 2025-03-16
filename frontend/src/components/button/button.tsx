import { ButtonHTMLAttributes, FC } from 'react';
import styles from './button.module.css';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export const Button: FC<Props> = ({ children, ...rest }) => {
    return (
        <button {...rest} className={styles.button}>
            {children}
        </button>
    );
};
