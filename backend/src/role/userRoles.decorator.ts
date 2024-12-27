import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/entities/user.roles';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)