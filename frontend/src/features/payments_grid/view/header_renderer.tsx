import { HeaderCell } from './header';

export class HeaderRenderer {
    renderLabel = () => {
        return <HeaderCell>Название</HeaderCell>;
    };

    renderPaymentType = () => {
        return <HeaderCell>Тип</HeaderCell>;
    };

    renderBank = () => {
        return <HeaderCell>Банк</HeaderCell>;
    };

    renderPaymentAmount = () => {
        return <HeaderCell>Сумма</HeaderCell>;
    };

    renderCategory = () => {
        return <HeaderCell>Категория</HeaderCell>;
    };

    renderPaymentDay = () => {
        return <HeaderCell>Дата</HeaderCell>;
    };
}
