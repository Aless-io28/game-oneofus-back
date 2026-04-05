import { Injectable } from '@nestjs/common';

import { ErrorCode } from '@common/error/error-code.interface';

@Injectable()
export default class ResponseWrapper {
  private success: boolean;
  private message: string;
  private data: unknown;
  private fieldErrors: ErrorCode[] | null;
  private timestamp: string;

  constructor(
    success: boolean,
    message: string,
    data: unknown,
    fieldErrors: ErrorCode[] | null,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.fieldErrors = fieldErrors;
    this.timestamp = new Date().toISOString();
  }

  static success(
    data: unknown,
    message: string = 'Request successful',
  ): ResponseWrapper {
    return new ResponseWrapper(true, message, data, null);
  }

  static error(fieldErrors: ErrorCode[], message: string = 'Request failed') {
    return new ResponseWrapper(false, message, null, fieldErrors);
  }
}
