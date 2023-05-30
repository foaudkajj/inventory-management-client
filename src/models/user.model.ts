import { UserStatus } from "./enums";
import { Role } from "./role.model";

export class User {
  id: string;
  firstName:string;
  lastName:string;
  username: string;
  password: string;
  pictureUrl:string;
  email:string;
  gsm:string;
  salt: string;
  status: UserStatus;
  roleId: string;
  branchId:string;
  merchantId:string;
  role: Role;
}
