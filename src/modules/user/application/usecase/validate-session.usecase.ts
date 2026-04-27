import { Inject, Injectable } from '@nestjs/common';

import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';
import BaseException from '@common/error/base.exception';
import SYSTEM_ERROR_CODE from '@common/error/system-error-code';
import { JWT_SERVICE, JwtPort } from '@modules/user/domain/ports/out/jwt.port';

@Injectable()
export class ValidateSessionUseCase {
  constructor(@Inject(JWT_SERVICE) private readonly jwtService: JwtPort) {}

  async execute(token: string): Promise<AuthUserPayload | null> {
    try {
      const payload = await this.jwtService.verifyToken(token);
      return {
        userId: payload.userId,
        username: payload.username,
      };
    } catch (error) {
      if (error) {
        throw new BaseException(SYSTEM_ERROR_CODE.UNAUTHORIZED);
      }
      return null;
    }
  }
}
