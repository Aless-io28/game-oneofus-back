import BaseException from '@common/error/base.exception';
import { ErrorCode } from '@common/error/error-code.interface';

export default class UserException extends BaseException {
  constructor(private readonly userErrorCode: ErrorCode) {
    super(userErrorCode);
  }
}
