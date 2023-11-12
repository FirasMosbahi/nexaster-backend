import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../enums/roles.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<RolesEnum[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const data = this.jwtService.decode(token);
        if (!data.userId || !data.role) return false;
        request.role = data.role;
        request.user = data.userId;
        return !roles || roles.includes(request.role);
      } catch (error) {}
    }
    return false;
  }
}
