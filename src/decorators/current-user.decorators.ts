import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUser } from 'src/interfaces/current-user.interface';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): ICurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);