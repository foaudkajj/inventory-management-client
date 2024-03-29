import { User } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<User[]> => {
  let result$ = AxiosService.get<User[]>(`users/get`);
  return result$;
};

const insert = (row: User): Promise<User> => {
  let result$ = AxiosService.post<User>(`users/insert`, row);
  return result$;
};

const modify = (key: string, row: User): Promise<User> => {
  let result$ = AxiosService.put<User>(`users/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<User> => {
  let result$ = AxiosService.remove<User>(`users/delete/${key}`);
  return result$;
};

export const UserService = {
  getAll,
  insert,
  modify,
  remove,
};
