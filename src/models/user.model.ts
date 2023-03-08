import { UserStatus } from "./enums";
import { Role } from "./role.model";

export class User {
  id: string;
  username: string;
  password: string;
  salt: string;
  status: UserStatus;
  roleId: string;
  role: Role;
}
