import { HeaderCell } from "./header";

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

  renderPaymentDay = () => {
    return <HeaderCell>Дата</HeaderCell>;
  };
}
