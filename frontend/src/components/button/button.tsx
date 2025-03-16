import { ComponentProps, FC, forwardRef } from 'react';
import styles from './button.module.css';

type Props = Omit<ComponentProps<'button'>, 'className'>;

export const Button: FC<Props> = forwardRef(({ children, ...rest }, ref) => {
    return (
        <button ref={ref} {...rest} className={styles.button}>
            {children}
        </button>
    );
});
