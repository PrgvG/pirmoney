import { FC, HTMLAttributes } from 'react';
import styles from './dialog_title.module.css';

type Props = {
    title: string;
} & HTMLAttributes<HTMLHeadingElement>;

export const DialogTitle: FC<Props> = ({ title }) => {
    return <h2 className={styles.title}>{title}</h2>;
};
