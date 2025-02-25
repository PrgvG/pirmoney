import { CSSProperties, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    align?: CSSProperties['textAlign'];
}>;

export const HeaderCell: FC<Props> = ({ children, align = 'start' }) => {
    return (
        <div
            style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                userSelect: 'none',
                padding: '0 8px',
                textAlign: align,
            }}
        >
            {children}
        </div>
    );
};
