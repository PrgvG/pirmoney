import { CellContext } from '@tanstack/react-table';
import { Cell } from './cell';
import {
    Bank,
    bankLabels,
    PaymentType,
    paymentTypeLabels,
} from '../../../shared';
import { isSeparatorRow } from '../model/helpers';
import { ReactNode } from 'react';
import { Payment } from '../../../entities';

export class CellRenderer {
    private renderDeleteButton;
    private renderCheckboxInput;
    private activeDate;

    constructor(
        renderDeleteButton: (payment: Payment) => ReactNode,
        renderCheckboxInput: (payment: Payment) => ReactNode,
        activeDate: { month: number; year: number },
    ) {
        this.renderDeleteButton = renderDeleteButton;
        this.renderCheckboxInput = renderCheckboxInput;
        this.activeDate = activeDate;
    }

    getPaymentDate(paymentDate: Date): string {
        return paymentDate.toLocaleDateString('ru', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }

    renderCheckbox = ({ row }: CellContext<Payment, unknown>) => {
        if (isSeparatorRow(row)) {
            return null;
        }

        if (row.original.payment_kind === 'income') {
            return null;
        }

        return this.renderCheckboxInput(row.original);
    };

    renderPaymentDate = ({ getValue }: CellContext<Payment, Date>) => {
        const localeToday = this.getPaymentDate(getValue());

        return <Cell align="right">{localeToday}</Cell>;
    };

    renderActions = ({ row }: CellContext<Payment, unknown>) => {
        if (isSeparatorRow(row)) {
            return null;
        }

        return <>{this.renderDeleteButton(row.original)}</>;
    };

    renderPaymentAmount = ({ getValue, row }: CellContext<Payment, number>) => {
        if (isSeparatorRow(row)) {
            return null;
        }
        const value = Number(getValue()).toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
        });

        function getColor(activeDate: { month: number; year: number }): string {
            if (row.original.payment_kind === 'income') {
                return 'green';
            }

            const today = new Date();

            if (
                today.getMonth() !== activeDate.month ||
                today.getFullYear() !== activeDate.year
            ) {
                return 'black';
            }

            if (row.original.payment_day > today.getDate()) {
                return 'black';
            }

            if (!row.original.completed_at) {
                return 'red';
            }

            return 'black';
        }

        return (
            <Cell align="right" color={getColor(this.activeDate)}>
                {value}
            </Cell>
        );
    };

    renderBank = ({ getValue, row }: CellContext<Payment, Bank>) => {
        if (isSeparatorRow(row)) {
            return null;
        }
        const bank = getValue();
        return <Cell>{bankLabels[bank]}</Cell>;
    };

    renderPaymentType = ({
        getValue,
        row,
    }: CellContext<Payment, PaymentType>) => {
        if (isSeparatorRow(row)) {
            return null;
        }
        const paymentType = getValue();
        return <Cell>{paymentTypeLabels[paymentType]}</Cell>;
    };

    renderLabel = ({ getValue }: CellContext<Payment, string>) => {
        return <Cell>{getValue()}</Cell>;
    };
}
