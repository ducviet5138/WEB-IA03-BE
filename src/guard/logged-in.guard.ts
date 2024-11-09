import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Types } from 'mongoose';
import { ICurrentUser } from 'src/interfaces/current-user.interface';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const user = await this.authService.validateJwtToken(token);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      request.user = {
        id: Types.ObjectId.createFromHexString(user.id),
      } as ICurrentUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
