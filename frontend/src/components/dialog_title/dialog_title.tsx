import { ComponentProps, FC } from 'react';
import styles from './dialog_title.module.css';

type Props = {
    title: string;
} & Omit<ComponentProps<'h2'>, 'className'>;

export const DialogTitle: FC<Props> = ({ title }) => {
    return <h2 className={styles.title}>{title}</h2>;
};
