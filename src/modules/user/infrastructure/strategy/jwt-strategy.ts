import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-auth',
) {
  constructor(private readonly configService: ConfigService) {
    const cookieName = configService.get<string>(
      'auth.cookieName',
      'access_token',
    );
    const secret = configService.get<string>('JWT_SECRET');

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

  validate(payload: AuthUserPayload): AuthUserPayload {
    return {
      userId: payload?.userId || null,
      username: payload?.username || null,
    };
  }
}
