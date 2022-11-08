import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RtStrategy.extractJwtFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: 'rt-secret123',
    });
  }
  validate(payload: any) {
    return payload;
  }

  private static extractJwtFromCookie(req: Request): string | null {
    if (req.cookies && 'refresh-token' in req.cookies) {
      return req.cookies['refresh-token'];
    }
    return null;
  }
}
