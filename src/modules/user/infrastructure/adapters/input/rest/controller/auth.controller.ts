import { AUTH_REGISTER } from '@modules/user/application/usecases/auth-register.usecase';
import type AuthRegisterUseCase from '@modules/user/application/usecases/auth-register.usecase';
import { Body, Controller, Inject } from '@nestjs/common';
import { UserCreateDto } from '../dto/user-create.dto';

@Controller('auth')
export default class AuthController {
  constructor(
    @Inject(AUTH_REGISTER) private readonly authRegister: AuthRegisterUseCase,
  ) {}

  async create(@Body() dto: UserCreateDto): Promise<void> {
    await this.authRegister.execute(dto.username, dto.email, dto.password);
  }
}
