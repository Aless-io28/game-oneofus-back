import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: AuthUserPayload): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
