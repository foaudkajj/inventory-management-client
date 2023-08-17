import { Product } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Product[]> => {
  let result$ = AxiosService.get<Product[]>(`Products/get`);
  return result$;
};

const insert = (row: Product): Promise<Product> => {
  let result$ = AxiosService.post<Product>(`Products/insert`, row);
  return result$;
};

const modify = (key: string, row: Product): Promise<Product> => {
  let result$ = AxiosService.put<Product>(`Products/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Product> => {
  let result$ = AxiosService.remove<Product>(`Products/delete/${key}`);
  return result$;
};
const getByBarcode = (barcode: string): Promise<Product | undefined> => {
  let result$ = AxiosService.get<Product>(`Products/getByBarcode/${barcode}`);
  return result$;
};

export const ProductService = {
  getAll,
  insert,
  modify,
  remove,
  getByBarcode,
};
