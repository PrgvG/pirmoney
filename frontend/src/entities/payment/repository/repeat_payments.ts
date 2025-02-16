import { repository } from "../../../services/repositoryService";
import type { RepeatPayment } from "../model";

export const repeatPaymentsRepository =
  repository<RepeatPayment>("repeat_payments");
