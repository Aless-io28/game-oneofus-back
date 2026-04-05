import { Inject } from '@nestjs/common';

import AuthRegisterUseCase from '../usecases/auth-register.usecase';
import { UserErrorCode } from '@modules/user/domain/errors/user.error';

import type UserRepository from '@modules/user/domain/repository/user-repository.interface';
import { USER_REPOSITORY } from '@modules/user/domain/repository/user-repository.interface';
import UserException from '@modules/user/domain/errors/user.exception';
import User from '@modules/user/domain/model/user.model';
import { JwtAuthService } from './jwt.service';

export default class AuthRegisterService implements AuthRegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async execute(
    username: string,
    email: string,
    password: string,
  ): Promise<string> {
    const user = await this.userRepo.findByUsernameOrEmail(username, email);

    if (user != null) {
      throw new UserException(UserErrorCode.USERNAME_EXISTS);
    }

    const userCreate: User = await this.userRepo.save(
      User.create(username, email, password),
    );

    // Generar el token JWT para el nuevo usuario registrado
    const token = this.jwtAuthService.generateToken({
      sub: userCreate.getUserId(),
      email: userCreate.getEmail(),
    });

    return token;
  }
}
