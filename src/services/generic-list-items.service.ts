import { GenericListItem } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (params?: object): Promise<GenericListItem[]> => {
  let result$ = AxiosService.get<GenericListItem[]>(`genericListItems/get`, params);
  return result$;
};

const insert = (row: GenericListItem): Promise<GenericListItem> => {
  let result$ = AxiosService.post<GenericListItem>(`genericListItems/insert`, row);
  return result$;
};

const modify = (key: string, row: GenericListItem): Promise<GenericListItem> => {
  let result$ = AxiosService.put<GenericListItem>(`genericListItems/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<GenericListItem> => {
  let result$ = AxiosService.remove<GenericListItem>(`genericListItems/delete/${key}`);
  return result$;
};

export const GenericListItemService = {
  getAll,
  insert,
  modify,
  remove,
};
