import { ComponentProps, FC } from 'react';
import styles from './label_title.module.css';

type Props = {
    title: string;
} & Omit<ComponentProps<'span'>, 'className'>;

export const LabelTitle: FC<Props> = ({ title }) => {
    return <span className={styles.title}>{title}</span>;
};
