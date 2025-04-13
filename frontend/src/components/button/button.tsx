import { ComponentProps, FC, forwardRef } from 'react';
import styles from './button.module.css';
import cx from 'classnames';

type Props = ComponentProps<'button'>;

export const Button: FC<Props> = forwardRef(
    ({ children, className, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                {...rest}
                className={cx(className, styles.button)}
            >
                {children}
            </button>
        );
    },
);
