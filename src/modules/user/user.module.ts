import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { USER_REPOSITORY } from './domain/repository/user-repository.interface';
import UserRepositoryAdapter from './infrastructure/adapters/output/prisma/repository/user-repository.adapter';

import { AUTH_REGISTER } from './application/usecases/auth-register.usecase';
import AuthRegisterService from './application/services/auth-register.service';

import AuthController from './infrastructure/adapters/input/rest/controller/auth.controller';
import { JwtAuthService } from './application/services/jwt.service';
import { AuthConfigService } from '@config/auth/auth-config.service';
import { PrismaModule } from '@database/prisma/prisma.module';
import { AuthConfigModule } from '@config/auth/auth-config.module';
import { HashModule } from '@common/security/hash/hash.module';

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
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryAdapter,
    },
    {
      provide: AUTH_REGISTER,
      useClass: AuthRegisterService,
    },
    JwtAuthService,
    AuthConfigService,
  ],
})
export class UserModule {}
