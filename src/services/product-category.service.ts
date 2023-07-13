import { ProductCategory } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<ProductCategory[]> => {
  let result$ = AxiosService.get<ProductCategory[]>(`productsCategories/get`);
  return result$;
};

const insert = (row: ProductCategory): Promise<ProductCategory> => {
  let result$ = AxiosService.post<ProductCategory>(`productsCategories/insert`, row);
  return result$;
};

const modify = (key: string, row: ProductCategory): Promise<ProductCategory> => {
  let result$ = AxiosService.put<ProductCategory>(`productsCategories/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<ProductCategory> => {
  let result$ = AxiosService.remove<ProductCategory>(`productsCategories/delete/${key}`);
  return result$;
};

export const ProductCategoryService = {
  getAll,
  insert,
  modify,
  remove,
};
