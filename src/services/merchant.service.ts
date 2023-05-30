import { Merchant } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Merchant[]> => {
  let result$ = AxiosService.get<Merchant[]>(`merchants/get`);
  return result$;
};


export const MerchantService = {
  getAll
};