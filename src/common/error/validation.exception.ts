import { ErrorCode } from './error-code.interface';

export default class ValidationException extends Error {
  constructor(public readonly errors: ErrorCode[]) {
    super('Validation failed');
  }
}
