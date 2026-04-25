import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';

export interface TokenValidatorPort {
  validate(payload: unknown): AuthUserPayload | null;
}
