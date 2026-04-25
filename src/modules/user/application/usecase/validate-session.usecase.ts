import { Inject, Injectable } from '@nestjs/common';

import { TokenValidatorPort } from '@modules/user/domain/ports/out/token-validator.port';
import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';
import BaseException from '@common/error/base.exception';
import SYSTEM_ERROR_CODE from '@common/error/system-error-code';

@Injectable()
export class ValidateSessionUseCase {
  constructor(
    @Inject('TOKEN_VALIDATOR')
    private readonly tokenValidator: TokenValidatorPort,
  ) {}

  async execute(token: string): Promise<AuthUserPayload> {
    const payload = this.tokenValidator.validate(token);
    if (!payload) {
      throw new BaseException(SYSTEM_ERROR_CODE.AUTH_TOKEN_MISSING);
    }
    return Promise.resolve(payload);
  }
}
