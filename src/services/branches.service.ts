import { Branch } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Branch[]> => {
  let result$ = AxiosService.get<Branch[]>(`branches/get`);
  return result$;
};

const insert = (row: Branch): Promise<Branch> => {
  let result$ = AxiosService.post<Branch>(`branches/insert`, row);
  return result$;
};

const modify = (key: string, row: Branch): Promise<Branch> => {
  let result$ = AxiosService.put<Branch>(`branches/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Branch> => {
  let result$ = AxiosService.remove<Branch>(`branches/delete/${key}`);
  return result$;
};

export const BranchService = {
  getAll,
  insert,
  modify,
  remove,
};
