import { LoginRequest, LoginResponse } from "../models";
import { AxiosService } from "./axios.service";

const login = (payload: LoginRequest): Promise<LoginResponse> => {
  let result$ = AxiosService.post<LoginResponse>(`auth/login`, payload);
  return result$;
};

export const AuthService = {
  login,
};
