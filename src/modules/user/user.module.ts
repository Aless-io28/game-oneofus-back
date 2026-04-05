import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { USER_REPOSITORY } from './domain/repository/user-repository.interface';
import UserRepositoryAdapter from './infrastructure/adapters/output/persistence/repository/user-repository.adapter';
import { AUTH_REGISTER } from './application/usecases/auth-register.usecase';
import AuthRegisterService from './application/services/auth-register.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRES_IN) * 60,
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryAdapter,
    },
    {
      provide: AUTH_REGISTER,
      useClass: AuthRegisterService,
    },
    UserService,
  ],
})
export class UserModule {}
