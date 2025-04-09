import { ComponentProps, FC, forwardRef } from 'react';
import styles from './button.module.css';

type Props = ComponentProps<'button'>;

export const Button: FC<Props> = forwardRef(
    ({ children, className, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                {...rest}
                className={
                    className ? `${className} ${styles.button}` : styles.button
                }
            >
                {children}
            </button>
        );
    },
);
