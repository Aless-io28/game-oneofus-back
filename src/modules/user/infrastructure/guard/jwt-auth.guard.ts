import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import BaseException from '@common/error/base.exception';
import SYSTEM_ERROR from '@common/error/system-error-code';
import { ValidateSessionUseCase } from '@modules/user/application/usecase/validate-session.usecase';
import { AuthConfigService } from '@config/auth/auth-config.service';
import { IS_PUBLIC_KEY } from '@common/decorators/public.decorator';

@Injectable()
export default class JwtAuthGuard implements CanActivate {
  constructor(
    private validateSession: ValidateSessionUseCase,
    private reflector: Reflector,
    private readonly authConfig: AuthConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) throw new BaseException(SYSTEM_ERROR.AUTH_TOKEN_MISSING);

    request['user'] = await this.validateSession.execute(token);
    return true;
  }

  private extractToken(request: Request): string | null {
    return (
      (request?.cookies as Record<string, string>)?.[
        this.authConfig.cookieName
      ] || null
    );
  }
}
