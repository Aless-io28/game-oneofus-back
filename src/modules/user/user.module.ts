import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthConfigService } from '@config/auth/auth-config.service';
import { PrismaModule } from '@database/prisma/prisma.module';
import { AuthConfigModule } from '@config/auth/auth-config.module';
import { HashModule } from '@common/security/hash/hash.module';

import AuthController from './infrastructure/adapters/input/rest/controller/auth.controller';
import { JwtAuthService } from './infrastructure/service/jwt.service';

import { AUTH_REGISTER } from './domain/ports/input/auth-register.port';
import AuthRegisterUseCase from './application/usecase/auth-register.usecase';
import { AUTH_LOGIN } from './domain/ports/input/auth-login.port';
import AuthLoginUseCase from './application/usecase/auth-login.usecase';

import { USER_REPOSITORY } from './domain/ports/out/user-repository.port';
import UserRepositoryAdapter from './infrastructure/adapters/output/prisma/repository/user-repository.adapter';
import { APP_GUARD } from '@nestjs/core';
import { ValidateSessionUseCase } from './application/usecase/validate-session.usecase';

import { JWT_SERVICE } from './domain/ports/out/jwt.port';
import JwtAuthGuard from './infrastructure/guard/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      inject: [AuthConfigService],
      useFactory: (authConfigService: AuthConfigService) => ({
        secret: authConfigService.jwtSecret,
        signOptions: {
          expiresIn: authConfigService.jwtExpiresIn,
        },
      }),
    }),
    HashModule,
  ],
  controllers: [AuthController],
  providers: [
    ValidateSessionUseCase,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryAdapter,
    },
    {
      provide: AUTH_REGISTER,
      useClass: AuthRegisterUseCase,
    },
    {
      provide: AUTH_LOGIN,
      useClass: AuthLoginUseCase,
    },
    // {
    //   provide: TOKEN_VALIDATOR,
    //   useClass: JwtStrategy,
    // },
    {
      provide: JWT_SERVICE,
      useClass: JwtAuthService,
    },
    AuthConfigService,
  ],
  exports: [ValidateSessionUseCase, JWT_SERVICE],
})
export class UserModule {}
