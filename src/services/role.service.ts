import { Role } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<Role[]> => {
  let result$ = AxiosService.get<Role[]>(`roles/get`);
  return result$;
};


export const RoleService = {
  getAll
};