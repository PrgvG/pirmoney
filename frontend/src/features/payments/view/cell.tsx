import { CSSProperties, FC, PropsWithChildren } from 'react';
import styles from './cell.module.css';

type Props = PropsWithChildren<{
    align?: CSSProperties['textAlign'];
    color?: CSSProperties['color'];
}>;

export const Cell: FC<Props> = ({ children, align = 'left', color }) => {
    return (
        <div className={styles.container} style={{ textAlign: align, color }}>
            {children}
        </div>
    );
};
