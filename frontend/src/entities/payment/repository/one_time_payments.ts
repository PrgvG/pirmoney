import { repository } from "../../../services/repositoryService";
import type { OneTimePayment } from "../model";

export const oneTimePaymentsRepository =
  repository<OneTimePayment>("one_time_payments");
