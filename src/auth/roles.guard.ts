import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt/dist';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;

      const splitedAuthHeader = authHeader.split(' ');
      const bearer = splitedAuthHeader[0];
      const token = splitedAuthHeader[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'not authorized' });
      }

      const user = this.jwtService.verify(token);

      request.user = user;

      const isUserHaveAccess = user.roles.some((role) =>
        requiredRoles.includes(role.value),
      );

      return isUserHaveAccess;
    } catch (error) {
      throw new ForbiddenException({ message: 'not authorized' });
    }
  }
}
