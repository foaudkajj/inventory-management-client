import { UserStatus, UserType } from "../enums";

export class LoginResponse {
  token: string;
  username: string;
  userType: UserType;
  status: UserStatus;
  name: string;
  surname: string;
  trName: string;
  trSurname: string;
}
