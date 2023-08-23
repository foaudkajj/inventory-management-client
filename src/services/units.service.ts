import { Unit } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Unit[]> => {
  let result$ = AxiosService.get<Unit[]>(`units/get`);
  return result$;
};

const insert = (row: Unit): Promise<Unit> => {
  let result$ = AxiosService.post<Unit>(`units/insert`, row);
  return result$;
};

const modify = (row: Unit, key: string): Promise<Unit> => {
  let result$ = AxiosService.put<Unit>(`units/update/${key}`, row)
  return result$;
}

const remove = (key: string): Promise<Unit> => {
  let result$ = AxiosService.remove<Unit>(`units/delete/${key}`)
  return result$
}

export const UnitService = {
  getAll,
  insert,
  modify,
  remove
};
