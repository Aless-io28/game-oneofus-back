import { AUTH_REGISTER } from '@modules/user/application/usecases/auth-register.usecase';
import type AuthRegisterUseCase from '@modules/user/application/usecases/auth-register.usecase';
import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { UserCreateDto } from '../dto/user-create.dto';
import { type Response } from 'express';
import { AuthConfigService } from '@config/auth/auth-config.service';

@Controller('auth')
export default class AuthController {
  constructor(
    @Inject(AUTH_REGISTER) private readonly authRegister: AuthRegisterUseCase,
    @Inject() private readonly authConfigService: AuthConfigService,
  ) {}

  @Post('register')
  async create(
    @Body() dto: UserCreateDto,
    @Res({ passthrough: true }) res: Response, // para que el interceptor siga manejando la respuesta
  ): Promise<boolean> {
    const token = await this.authRegister.execute(
      dto.username,
      dto.email,
      dto.password,
    );

    res.cookie(
      this.authConfigService.cookieName,
      token,
      this.authConfigService.cookieOptions as any,
    );

    return true;
  }

  @Get('verify')
  verify(): boolean {
    return true;
  }
}
