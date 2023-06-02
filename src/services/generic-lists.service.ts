import { GenericList } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<GenericList[]> => {
  let result$ = AxiosService.get<GenericList[]>(`genericLists/get`);
  return result$;
};

const insert = (row: GenericList): Promise<GenericList> => {
  let result$ = AxiosService.post<GenericList>(`genericLists/insert`, row);
  return result$;
};

const modify = (key: string, row: GenericList): Promise<GenericList> => {
  let result$ = AxiosService.put<GenericList>(`genericLists/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<GenericList> => {
  let result$ = AxiosService.remove<GenericList>(`genericLists/delete/${key}`);
  return result$;
};

export const GenericListService = {
  getAll,
  insert,
  modify,
  remove,
};
