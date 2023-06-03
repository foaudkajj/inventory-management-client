import { PaymentMethod } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<PaymentMethod[]> => {
  let result$ = AxiosService.get<PaymentMethod[]>(`paymentMethods/get`);
  return result$;
};

const insert = (row: PaymentMethod): Promise<PaymentMethod> => {
  let result$ = AxiosService.post<PaymentMethod>(`paymentMethods/insert`, row);
  return result$;
};

const modify = (key: string, row: PaymentMethod): Promise<PaymentMethod> => {
  let result$ = AxiosService.put<PaymentMethod>(`paymentMethods/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<PaymentMethod> => {
  let result$ = AxiosService.remove<PaymentMethod>(`paymentMethods/delete/${key}`);
  return result$;
};

export const PaymentMethodService = {
  getAll,
  insert,
  modify,
  remove,
};
