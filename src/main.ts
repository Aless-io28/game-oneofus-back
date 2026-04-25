import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import { ResponseInterceptor } from '@common/interceptor/response.interceptor';
import { GlobalExceptionFilter } from '@common/exception/global-exception.filter';
import { ErrorCode } from '@common/error/error-code.interface';
import ValidationException from '@common/error/validation.exception';
import { AuthConfigService } from '@config/auth/auth-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN!,
    credentials: true,
  });

  // app.useGlobalGuards(...)   // si ya se tiene el APP_GUARD

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      // Sirve para transformar los errores de validación en una excepción personalizada
      exceptionFactory: (errors) => {
        const listErrors: ErrorCode[] = [];

        errors.forEach((e) =>
          listErrors.push({
            code: 'INV_CLASS_VALID',
            message: Object.values(e.constraints || {})[0],
            status: 400,
            field: e.property,
          } as ErrorCode),
        );

        return new ValidationException(listErrors);
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(
    new GlobalExceptionFilter(app.get(I18nService), app.get(AuthConfigService)),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  // Fail fast when infrastructure dependencies (like DB) are unavailable.
  console.error('Application bootstrap failed:', message);
  process.exit(1);
});
