import { Inject, Injectable } from '@nestjs/common';

import AuthRegisterUseCase from '../usecases/auth-register.usecase';
import { UserErrorCode } from '@modules/user/domain/errors/user.error';

import type UserRepository from '@modules/user/domain/repository/user-repository.interface';
import { USER_REPOSITORY } from '@modules/user/domain/repository/user-repository.interface';
import UserException from '@modules/user/domain/errors/user.exception';
import User from '@modules/user/domain/model/user.model';
import ValidatorError from '@common/error/validator.error';
import { HASH_SERVICE, HashService } from '@common/security/hash/has.service';
import { JwtAuthService } from './jwt.service';

@Injectable()
export default class AuthRegisterService implements AuthRegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    private readonly jwtAuthService: JwtAuthService,
    @Inject(HASH_SERVICE) private readonly hashService: HashService,
  ) {}

  async execute(
    username: string,
    email: string,
    password: string,
  ): Promise<string> {
    const userExists = await this.userRepo.findByUsernameOrEmail(
      username,
      email,
    );

    // 1. Verificar si el usuario ya existe por username o email
    if (userExists != null) {
      throw new UserException(UserErrorCode.USER_EXISTS);
    }

    const validator = new ValidatorError();
    User.validatePassword(password, validator);
    validator.validate();

    const passwordHashed = await this.hashService.hash(password);

    // 2. Crear el nuevo usuario
    const user = User.create(username, email, passwordHashed);

    // 3. Guardar el nuevo usuario en la base de datos
    const userCreate: User = await this.userRepo.save(user);

    // Generar el token JWT para el nuevo usuario registrado
    const token = this.jwtAuthService.generateToken({
      userId: userCreate.getUserId(),
      username: userCreate.getUsername(),
    });

    return token;
  }
}
