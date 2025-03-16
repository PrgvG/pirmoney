import { ComponentProps, FC, forwardRef } from 'react';
import styles from './input.module.css';

type Props = Omit<ComponentProps<'input'>, 'className'>;

export const Input: FC<Props> = forwardRef(({ children, ...rest }, ref) => {
    return <input ref={ref} {...rest} className={styles.input} />;
});
