import { Country } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Country[]> => {
  let result$ = AxiosService.get<Country[]>(`countries/get`);
  return result$;
};


export const CountryService = {
  getAll
};
