export type Bank =
  | "sberbank"
  | "t_bank"
  | "yandex_bank"
  | "yandex_split"
  | "bank_uralsib"
  | "rosbank";

export const bankLabels: Record<Bank, string> = {
  sberbank: "Сбербанк",
  t_bank: "ТБанк",
  yandex_bank: "Яндекс.Банк",
  yandex_split: "Яндекс.Сплит",
  bank_uralsib: "Уралсиб",
  rosbank: "Росбанк",
};

export const bankOptions: Record<Bank, string> = {
  sberbank: bankLabels.sberbank,
  t_bank: bankLabels.t_bank,
  yandex_bank: bankLabels.yandex_bank,
  yandex_split: bankLabels.yandex_split,
  bank_uralsib: bankLabels.bank_uralsib,
  rosbank: bankLabels.rosbank,
};
