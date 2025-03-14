import { FC, ReactNode } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { getColumns } from './model/column_config';

import { Table } from './view/table';
import { Payment } from '../../entities';
import styles from './payments_grid.module.css';

type Props = {
    payments: (Payment & { payment_date: Date })[];
    renderDeleteButton(payment: Payment): ReactNode;
    renderCheckboxInput(payment: Payment): ReactNode;
    renderEditButton(payment: Payment): ReactNode;
    activeDate: { month: number; year: number };
    monthSwitcher: ReactNode;
};

export const PaymentsGrid: FC<Props> = ({
    payments,
    renderDeleteButton,
    renderCheckboxInput,
    renderEditButton,
    activeDate,
    monthSwitcher,
}) => {
    const table = useReactTable({
        data: payments,
        columns: getColumns({
            renderDeleteButton,
            renderCheckboxInput,
            renderEditButton,
            activeDate,
        }),
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
        defaultColumn: {
            size: 220,
            maxSize: 400,
        },
    });

    const hasPayments =
        payments.filter((payment) => payment._id !== 'separator').length > 0;

    return (
        <div style={{ maxWidth: '100%' }}>
            {hasPayments ? (
                <>
                    <div className={styles.wrapper}>{monthSwitcher}</div>
                    <div className={styles.wrapper}>
                        {<Table table={table} />}
                    </div>
                </>
            ) : (
                <div>Пока что тут нет платежей</div>
            )}
        </div>
    );
};
