import { Row } from '@tanstack/react-table';
import { Payment } from '../../../entities';

export function isSeparatorRow(row: Row<Payment>): boolean {
    return row.original._id === 'separator';
}
