import { FC, ReactNode } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { getColumns } from './model/column_config';

import { Table } from './view/table';
import { Payment } from '../../entities';
import styles from './payments_grid.module.css';
import { Alert } from 'antd';

type Props = {
    payments: (Payment & { payment_date: Date })[];
    renderDeleteButton(payment: Payment): ReactNode;
    renderCheckboxInput(payment: Payment): ReactNode;
    activeDate: { month: number; year: number };
    monthSwitcher: ReactNode;
};

export const PaymentsGrid: FC<Props> = ({
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
            {payments.filter((payment) => payment._id !== 'separator').length >
            0 ? (
                <>
                    <div className={styles.month_wrapper}>{monthSwitcher}</div>
                    <Table table={table} />
                </>
            ) : (
                <Alert message="Пока что тут нет платежей" type="info" />
            )}
        </div>
    );
};
