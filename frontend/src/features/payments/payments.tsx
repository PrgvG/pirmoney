import { FC, ReactNode } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { getColumns } from './model/column_config';

import { Table } from './view/table';
import { Payment } from '../../entities';
import styles from './payments.module.css';

type Props = {
    payments: (Payment & { payment_date: Date })[];
    renderDeleteButton(payment: Payment): ReactNode;
    renderCheckboxInput(payment: Payment): ReactNode;
    activeDate: { month: number; year: number };
    monthSwitcher: ReactNode;
};

export const Payments: FC<Props> = ({
    payments,
    renderDeleteButton,
    renderCheckboxInput,
    activeDate,
    monthSwitcher,
}) => {
    const table = useReactTable({
        data: payments,
        columns: getColumns({
            renderDeleteButton,
            renderCheckboxInput,
            activeDate,
        }),
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange',
        defaultColumn: {
            size: 220,
            maxSize: 400,
        },
    });

    return (
        <div style={{ width: table.getTotalSize() }}>
            <div className={styles.month_wrapper}>{monthSwitcher}</div>
            <Table table={table} />
        </div>
    );
};
