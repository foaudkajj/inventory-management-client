import { UserStatus } from "../enums";

export class LoginResponse {
  access_token: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
    status: UserStatus;
  };
}
