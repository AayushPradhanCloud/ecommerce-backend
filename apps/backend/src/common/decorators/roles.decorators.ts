import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/role.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const AdminOnly = () => Roles(Role.Admin);
export const AdminOrManager = () => Roles(Role.Admin, Role.Manager);
export const CustomerOnly = () => Roles(Role.Customer);
