import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => {
          const cookieName = (process.env.COOKIE_NAME as string) || 'ath';
          return (req?.cookies as Record<string, string>)?.[cookieName] || null;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  validate(payload: AuthUserPayload): AuthUserPayload {
    return {
      userId: payload?.userId || null,
      username: payload?.username || null,
    };
  }
}
