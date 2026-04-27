// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Request } from 'express';
// import { AuthUserPayload } from '@common/interfaces/auth-user-payload.interface';
// import { AuthConfigService } from '@config/auth/auth-config.service';

// @Injectable()
// export default class JwtStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-auth',
// ) {
//   constructor(private authConfig: AuthConfigService) {
//     const cookieName = authConfig.cookieName;
//     const secret = authConfig.jwtSecret;

//     if (!secret) {
//       throw new Error('JWT_SECRET is required');
//     }

//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         ExtractJwt.fromAuthHeaderAsBearerToken(),
//         (req: Request) => {
//           return (req?.cookies as Record<string, string>)?.[cookieName] || null;
//         },
//       ]),
//       secretOrKey: secret,
//     });
//   }

//   // Passport llama esto automáticamente tras verificar la firma
//   validate(payload: AuthUserPayload): AuthUserPayload | null {
//     if (!payload?.userId || !payload?.username) return null;
//     return {
//       userId: payload?.userId || null,
//       username: payload?.username || null,
//     };
//   }
// }

// SE USA EL USECASE DE VALIDAR SESIÓN EN VEZ DE ESTA ESTRATEGIA,
// PORQUE ASÍ SE SEPARA MEJOR LA LÓGICA DE NEGOCIO DE LA INFRAESTRUCTURA,
// Y SE PUEDE REUTILIZAR EL USECASE EN OTROS CONTEXTOS
// (POR EJEMPLO, SI SE QUIERE VALIDAR EL TOKEN EN UN MICROSERVICIO QUE NO USA NESTJS, O SI SE QUIERE VALIDAR EL TOKEN EN UN CONTEXTO QUE NO ES HTTP, COMO WEBSOCKETS O GRPC).
