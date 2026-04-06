import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';
import BaseException from '@common/error/base.exception';
import { ErrorCode } from '@common/error/error-code.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-auth') {
  handleRequest<TUser = AuthUserPayload>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw new BaseException({
        code: 'UNAUTHORIZED',
        message: 'server.unauthorized',
        status: 401,
      } as ErrorCode);
    }

    return user;
  }
}
