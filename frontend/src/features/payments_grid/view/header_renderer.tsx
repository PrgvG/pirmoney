import { HeaderCell } from './header';

export class HeaderRenderer {
    renderLabel = () => {
        return <HeaderCell>Название</HeaderCell>;
    };

    renderPaymentType = () => {
        return <HeaderCell align="center">Тип</HeaderCell>;
    };

    renderBank = () => {
        return <HeaderCell>Банк</HeaderCell>;
    };

    renderPaymentAmount = () => {
        return <HeaderCell align="end">Сумма</HeaderCell>;
    };

    renderCategory = () => {
        return <HeaderCell>Категория</HeaderCell>;
    };

    renderPaymentDay = () => {
        return <HeaderCell align="end">Дата</HeaderCell>;
    };
}
