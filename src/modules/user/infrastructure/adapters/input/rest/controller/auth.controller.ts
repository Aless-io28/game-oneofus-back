import { type Response } from 'express';
import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';

import { AuthConfigService } from '@config/auth/auth-config.service';

import { UserCreateDto } from '../dto/user-create.dto';
import { UserLoginDto } from '../dto/user-login.dto';

import AuthLoginPort, {
  AUTH_LOGIN,
} from '@modules/user/domain/ports/input/auth-login.port';
import AuthRegisterPort, {
  AUTH_REGISTER,
} from '@modules/user/domain/ports/input/auth-register.port';
import { Public } from '@common/decorators/public.decorator';

@Controller('auth')
export default class AuthController {
  constructor(
    @Inject(AUTH_REGISTER) private readonly authRegister: AuthRegisterPort,
    @Inject(AUTH_LOGIN) private readonly authLogin: AuthLoginPort,
    @Inject() private readonly authConfigService: AuthConfigService,
  ) {}

  @Public()
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

  @Public()
  @Post('login')
  async login(
    @Body() dto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    const token = await this.authLogin.execute(dto.email, dto.password);
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
