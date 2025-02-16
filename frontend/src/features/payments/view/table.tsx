import { FC } from 'react';

import { flexRender, Table as TTable } from '@tanstack/react-table';

import styles from './table.module.css';
import { isSeparatorRow } from '../model/helpers';
import { Payment } from '../../../entities';

type Props = {
    table: TTable<Payment>;
};

export const Table: FC<Props> = ({ table }) => (
    <table className={styles.table} style={{ width: table.getTotalSize() }}>
        <thead className={styles.header}>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            colSpan={header.colSpan}
                            style={{
                                width: header.getSize(),
                                position: 'relative',
                            }}
                        >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                            {header.column.getCanResize() && (
                                <div
                                    className={styles.resizer}
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                />
                            )}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr
                    className={
                        isSeparatorRow(row) ? styles.separator : styles.row
                    }
                    key={row.id}
                >
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}
                            style={{ width: cell.column.getSize() }}
                        >
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                            )}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
        <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                        <th
                            key={header.id}
                            colSpan={header.colSpan}
                            style={{ width: header.getSize() }}
                        >
                            {flexRender(
                                header.column.columnDef.footer,
                                header.getContext(),
                            )}
                        </th>
                    ))}
                </tr>
            ))}
        </tfoot>
    </table>
);
