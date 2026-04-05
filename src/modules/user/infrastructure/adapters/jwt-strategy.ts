import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub?: string;
  username?: string;
}

interface ValidatedUser {
  userId: string | null;
  username: string | null;
}

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  validate(payload: JwtPayload): ValidatedUser {
    return {
      userId: payload?.sub || null,
      username: payload?.username || null,
    };
  }
}
