import { ComponentProps, FC } from 'react';
import styles from './text_button.module.css';

type Props = Omit<ComponentProps<'button'>, 'className'>;

export const TextButton: FC<Props> = (props) => {
    return (
        <button {...props} className={styles.button}>
            {props.children}
        </button>
    );
};
