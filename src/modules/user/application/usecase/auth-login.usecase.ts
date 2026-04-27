import { Inject, Injectable } from '@nestjs/common';

import { HASH_SERVICE, HashService } from '@common/security/hash/has.service';
import UserException from '@modules/user/domain/errors/user.exception';
import { UserErrorCode } from '@modules/user/domain/errors/user.error';
import AuthLoginPort from '@modules/user/domain/ports/input/auth-login.port';
import UserRepository, {
  USER_REPOSITORY,
} from '@modules/user/domain/ports/out/user-repository.port';
import { JWT_SERVICE, JwtPort } from '@modules/user/domain/ports/out/jwt.port';

@Injectable()
export default class AuthLoginUseCase implements AuthLoginPort {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @Inject(JWT_SERVICE) private readonly jwtAuthService: JwtPort,
    @Inject(HASH_SERVICE) private readonly hashService: HashService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    // 1. Buscar el usuario por email
    const userExists = await this.userRepo.findByEmail(email);

    // 2. Verificar si el usuario existe
    if (userExists == null) {
      throw new UserException(UserErrorCode.USER_NOT_FOUND);
    }

    // 3. Verificar la contraseña
    const passwordMatch = await this.hashService.compare(
      password,
      userExists.getPassword(),
    );

    if (!passwordMatch) {
      throw new UserException(UserErrorCode.INVALID_CREDENTIALS);
    }

    // 4. Generar el token JWT para el usuario autenticado
    const token = this.jwtAuthService.generateToken({
      userId: userExists.getUserId(),
      username: userExists.getUsername(),
    });

    return token;
  }
}
