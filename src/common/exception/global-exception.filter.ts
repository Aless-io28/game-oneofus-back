import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { I18nService } from 'nestjs-i18n';

import BaseException from '@common/error/base.exception';
import ValidationException from '@common/error/validation.exception';
import ResponseWrapper from '@common/interceptor/response-wrapper';
import { AuthConfigService } from '@config/auth/auth-config.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly i18n: I18nService,
    private readonly config: AuthConfigService,
  ) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    /**
     * ----------------------------------------------------
     *  Manejar los errores de los campos enviados
     * ----------------------------------------------------
     */
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

      return response.status(400).json(ResponseWrapper.error(fieldErrors));
    }

    /**
     * ----------------------------------------------------
     *  Manejar excepciones personalizadas que extienden de BaseException
     * ----------------------------------------------------
     */
    if (exception instanceof BaseException) {
      const translateMessage: string = await this.i18n.translate(
        exception.errorCode.message,
        {
          lang: request.headers['accept-language'] || 'es',
          args: exception.errorCode.args,
        },
      );

      return response
        .status(exception.errorCode.status)
        .json(ResponseWrapper.error([], translateMessage));
    }

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message = this.resolveExceptionMessage(exception);
    const details = this.resolveExceptionDetails(exception);

    if (this.config.isProduction) {
      return response.status(status).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString(),
      });
    }

    response.status(status).json({
      success: false,
      error: message,
      ...(details ? { details } : {}),
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Resolver el mensaje de la excepción, manejando diferentes tipos de excepciones
   * @param exception
   * @returns El mensaje de error a mostrar en la respuesta
   */
  private resolveExceptionMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'string') {
        return response;
      }

      if (typeof response === 'object' && response !== null) {
        const responseMessage = (response as { message?: unknown }).message;

        if (Array.isArray(responseMessage)) {
          return responseMessage.join(', ');
        }

        if (typeof responseMessage === 'string') {
          return responseMessage;
        }
      }

      return exception.message;
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return String(exception);
  }

  /**
   * Resolver detalles adicionales de la excepción, como el stack trace u otros campos relevantes
   * @param exception
   * @returns Los detalles de la excepción a incluir en la respuesta (opcional)
   */
  private resolveExceptionDetails(
    exception: unknown,
  ): Record<string, unknown> | undefined {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'object' && response !== null) {
        return response as Record<string, unknown>;
      }
    }

    if (exception instanceof Error && exception.stack) {
      return { stack: exception.stack };
    }

    return undefined;
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
