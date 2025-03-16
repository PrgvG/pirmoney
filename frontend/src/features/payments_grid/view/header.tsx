import { FC } from 'react';
import styles from './header.module.css';
import cx from 'classnames';

export const Header: FC = () => {
    return (
        <div className={styles.header}>
            <div />
            <div className={styles.cell}>Тип</div>
            <div className={styles.cell}>Название</div>
            <div className={cx(styles.rightAligned, styles.cell)}>Сумма</div>
            <div className={cx(styles.rightAligned, styles.cell)}>Дата</div>
            <div className={styles.cell}>Категория</div>
            <div className={styles.cell}>Банк</div>
            <div />
            <div />
        </div>
    );
};
