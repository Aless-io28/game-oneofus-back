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

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRES_IN) * 60,
      },
    }),
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
