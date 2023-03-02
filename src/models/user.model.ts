import { UserStatus, UserType } from "./enums";
import { Role } from "./role.model";

export class User {
  id: string;
  type: UserType;
  rowId: string;
  username: string;
  password: string;
  salt: string;
  status: UserStatus;
  roleId: string;
  Role: Role;
}
