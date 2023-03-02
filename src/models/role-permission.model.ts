import { Permission } from "./permission.model";
import { Role } from "./role.model";

export class RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  role: Role;
  permission: Permission;
}
