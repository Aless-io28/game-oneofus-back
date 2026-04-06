import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import { ResponseInterceptor } from '@common/interceptor/response.interceptor';
import { GlobalExceptionFilter } from '@common/exception/global-exception.filter';
import { ErrorCode } from '@common/error/error-code.interface';
import ValidationException from '@common/error/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN!,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
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
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(I18nService)));

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
