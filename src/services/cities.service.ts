import { City } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<City[]> => {
  let result$ = AxiosService.get<City[]>(`cities/get`);
  return result$;
};

export const CityService = {
  getAll,
};
