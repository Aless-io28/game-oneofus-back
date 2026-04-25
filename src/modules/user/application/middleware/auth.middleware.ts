import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

import { AuthConfigService } from '@config/auth/auth-config.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authConfig: AuthConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = (req.cookies as Record<string, string>)?.[
      this.authConfig.cookieName
    ];

    if (token) {
      req['token'] = token;
    }

    next();
  }
}
