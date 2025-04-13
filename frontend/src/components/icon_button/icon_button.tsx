import { ComponentProps, FC } from 'react';
import styles from './icon_button.module.css';
import { Button } from '../button/button';
import cx from 'classnames';

type Props = Omit<ComponentProps<'button'>, 'type'> & {
    label: string;
};

export const IconButton: FC<Props> = ({ label, className, ...rest }) => {
    return (
        <Button
            type="button"
            {...rest}
            className={cx(className, styles.button)}
        >
            {label}
        </Button>
    );
};
