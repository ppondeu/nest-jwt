import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

import { ROLES_KEY } from '../decorators/roles.decorator'
import { UserDocument, UserRole } from 'src/users/schemas';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return false;

        const req = context.switchToHttp().getRequest<Request>()
        const user = req.user as UserDocument
        if (!user) return false

        return requiredRoles.some((role) => user.role.includes(role))
    }
}
