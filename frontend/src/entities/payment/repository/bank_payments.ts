import { repository } from "../../../services/repositoryService";
import type { BankPayment } from "../model";

export const bankPaymentsRepository = repository<BankPayment>("bank_payments");
