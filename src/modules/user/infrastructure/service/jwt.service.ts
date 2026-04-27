import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';
import { JwtPort } from '@modules/user/domain/ports/out/jwt.port';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService implements JwtPort {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: AuthUserPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async verifyToken(token: string): Promise<AuthUserPayload> {
    return await this.jwtService.verifyAsync(token);
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
