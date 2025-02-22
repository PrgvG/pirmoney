import { createColumnHelper } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { CellRenderer } from '../view/cell_renderer';
import { HeaderRenderer } from '../view/header_renderer';
import { Payment } from '../../../entities';

const columnHelper = createColumnHelper<Payment>();

type Props = {
    renderDeleteButton(payment: Payment): ReactNode;
    renderCheckboxInput(payment: Payment): ReactNode;
    activeDate: { month: number; year: number };
};

export const getColumns = ({
    renderDeleteButton,
    renderCheckboxInput,
    activeDate,
}: Props) => {
    const cellRenderer = new CellRenderer(
        renderDeleteButton,
        renderCheckboxInput,
        activeDate,
    );
    const headerRenderer = new HeaderRenderer();

    return [
        columnHelper.display({
            id: 'checkbox',
            enableResizing: false,
            cell: cellRenderer.renderCheckbox,
            size: 24,
        }),
        columnHelper.accessor('label', {
            header: headerRenderer.renderLabel,
            cell: cellRenderer.renderLabel,
            size: 150,
        }),

        columnHelper.accessor('payment_type', {
            header: headerRenderer.renderPaymentType,
            cell: cellRenderer.renderPaymentType,
            size: 200,
        }),
        columnHelper.accessor('bank', {
            header: headerRenderer.renderBank,
            cell: cellRenderer.renderBank,
            size: 150,
        }),
        columnHelper.accessor('category_id', {
            header: headerRenderer.renderCategory,
            cell: cellRenderer.renderCategory,
            size: 150,
        }),
        columnHelper.accessor('payment_amount', {
            header: headerRenderer.renderPaymentAmount,
            cell: cellRenderer.renderPaymentAmount,
            size: 150,
        }),
        columnHelper.accessor('payment_date', {
            header: headerRenderer.renderPaymentDay,
            cell: cellRenderer.renderPaymentDate,
            size: 150,
        }),

        columnHelper.display({
            id: 'actions',
            enableResizing: false,
            cell: cellRenderer.renderActions,
            size: 30,
        }),
    ];
};
