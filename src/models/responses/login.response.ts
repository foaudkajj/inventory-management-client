import { UserStatus } from "../enums";

export class LoginResponse {
  token: string;
  username: string;
  status: UserStatus;
  name: string;
  surname: string;
}
