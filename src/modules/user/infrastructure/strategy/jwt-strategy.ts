import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';
import { AuthConfigService } from '@config/auth/auth-config.service';
import { TokenValidatorPort } from '@modules/user/domain/ports/out/token-validator.port';

@Injectable()
export default class JwtStrategy
  extends PassportStrategy(Strategy, 'jwt-auth')
  implements TokenValidatorPort
{
  constructor(private authConfig: AuthConfigService) {
    const cookieName = authConfig.cookieName;
    const secret = authConfig.jwtSecret;

    if (!secret) {
      throw new Error('JWT_SECRET is required');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => {
          return (req?.cookies as Record<string, string>)?.[cookieName] || null;
        },
      ]),
      secretOrKey: secret,
    });
  }

  // Passport llama esto automáticamente tras verificar la firma
  validate(payload: AuthUserPayload): AuthUserPayload | null {
    if (!payload?.userId || !payload?.username) return null;
    return {
      userId: payload?.userId || null,
      username: payload?.username || null,
    };
  }
}
