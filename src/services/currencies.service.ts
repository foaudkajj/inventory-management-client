import {  Currency } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Currency[]> => {
  let result$ = AxiosService.get<Currency[]>(`currencies/get`);
  return result$;
};

const insert = (row: Currency): Promise<Currency> => {
  let result$ = AxiosService.post<Currency>(`currencies/insert`, row);
  return result$;
};

const modify = (key: string, row: Currency): Promise<Currency> => {
  let result$ = AxiosService.put<Currency>(`currencies/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Currency> => {
  let result$ = AxiosService.remove<Currency>(`currencies/delete/${key}`);
  return result$;
};

export const CurrencyService = {
  getAll,
  insert,
  modify,
  remove,
};
