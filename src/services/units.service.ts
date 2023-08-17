import { Unit } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Unit[]> => {
  let result$ = AxiosService.get<Unit[]>(`units/get`);
  return result$;
};

export const UnitService = {
  getAll,
};
