import { ErrorCode } from './error-code.interface';

export default class BaseException extends Error {
  constructor(public readonly errorCode: ErrorCode) {
    super(errorCode.message);
  }
}
