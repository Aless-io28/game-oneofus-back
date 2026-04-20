import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * App
   */
  get isProduction(): boolean {
    return this.configService.get<boolean>('app.production', false);
  }

  /**
   * Cookies
   */
  get cookieName(): string {
    return this.configService.get<string>('auth.cookieName', 'access_token');
  }

  get cookieOptions(): {
    maxAge: number;
    secure: boolean;
    httpOnly: boolean;
    sameSite: string;
  } {
    return {
      maxAge:
        this.configService.get<number>('auth.cookieMaxAge', 3600000) * 24 * 31, // 31 días por defecto
      secure: this.configService.get<boolean>('auth.cookieSecure', false), // solo se envía a través de HTTPS (en producción)
      httpOnly: this.configService.get<boolean>('auth.cookieHttpOnly', true), // solo se puede acceder desde el servidor
      sameSite: 'strict', // solo se envía si la solicitud viene de la misma origen
    };
  }

  /**
   * JWT
   */
  get jwtSecret(): string {
    const secret = this.configService.get<string>('jwt.secret');
    if (!secret) {
      throw new Error('JWT_SECRET is required');
    }
    return secret;
  }

  get jwtExpiresIn(): number {
    return this.configService.get<number>('jwt.expiresIn', 60); // 24 horas * 60
  }
}
