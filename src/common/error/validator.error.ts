import { ErrorCode } from './error-code.interface';
import ValidationException from './validation.exception';

export default class ValidatorError {
  private readonly listErrors: ErrorCode[] = [];

  public add(error: ErrorCode) {
    this.listErrors.push(error);
  }

  public validate() {
    if (this.listErrors.length > 0) {
      throw new ValidationException(this.listErrors);
    }
  }
}
