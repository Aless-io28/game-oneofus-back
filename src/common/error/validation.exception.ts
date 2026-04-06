import { BadRequestException } from '@nestjs/common';

import { ErrorCode } from './error-code.interface';

export default class ValidationException extends BadRequestException {
  constructor(public readonly errors: ErrorCode[]) {
    super('Validation failed');
  }
}
