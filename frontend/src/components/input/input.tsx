import { ComponentProps, FC } from 'react';
import styles from './input.module.css';

type Props = Omit<ComponentProps<'input'>, 'className'>;

export const Input: FC<Props> = ({ children, ...rest }) => {
    return <input {...rest} className={styles.input} />;
};
