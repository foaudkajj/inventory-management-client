import { Color } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Color[]> => {
  let result$ = AxiosService.get<Color[]>(`colors/get`);
  return result$;
};

const insert = (row: Color): Promise<Color> => {
  let result$ = AxiosService.post<Color>(`colors/insert`, row);
  return result$;
};

const modify = (key: string, row: Color): Promise<Color> => {
  let result$ = AxiosService.put<Color>(`colors/update/${key}`, row);
  return result$;
};

const remove = (key: string): Promise<Color> => {
  let result$ = AxiosService.remove<Color>(`colors/delete/${key}`);
  return result$;
};

export const ColorService = {
  getAll,
  insert,
  modify,
  remove,
};
