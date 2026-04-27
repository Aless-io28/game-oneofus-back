import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';

// implements in jwt.service.ts
export interface JwtPort {
  generateToken(payload: AuthUserPayload): Promise<string>;
  verifyToken(token: string): Promise<AuthUserPayload>;
  decodeToken(token: string): any;
}

export const JWT_SERVICE = Symbol('JWT_SERVICE');
