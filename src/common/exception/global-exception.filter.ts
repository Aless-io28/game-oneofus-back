import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { I18nService } from 'nestjs-i18n';

import BaseException from '@common/error/base.exception';
import ValidationException from '@common/error/validation.exception';
import ResponseWrapper from '@common/interceptor/response-wrapper';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject(I18nService) private readonly i18n: I18nService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Manejar los errores de los campos enviados
    if (exception instanceof ValidationException) {
      const fieldErrors = await Promise.all(
        exception.errors.map(async (err) => {
          const translateMessage = await this.translateMessage(
            request,
            err.message,
            err.args as Record<string, unknown>,
          );

          return {
            ...err,
            message: translateMessage,
          };
        }),
      );

      ResponseWrapper.error(fieldErrors);
    }

    //  Manejar excepciones personalizadas que extienden de BaseException
    if (exception instanceof BaseException) {
      const translateMessage: string = await this.i18n.translate(
        exception.errorCode.message,
        {
          lang: request.headers['accept-language'] || 'es',
          args: exception.errorCode.args,
        },
      );

      ResponseWrapper.error([], translateMessage);
    }

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    response.status(status).json({
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Traducir mensaje con i18n
   */
  private async translateMessage(
    request: Request,
    message: string,
    args: Record<string, unknown>,
  ): Promise<string> {
    const messageTranslate = await this.i18n.translate(message, {
      lang: request.headers['accept-language'] || 'es',
      args,
    });

    return (messageTranslate as string) || message;
  }
}
