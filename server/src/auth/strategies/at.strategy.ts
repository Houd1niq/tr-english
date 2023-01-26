import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

export type PayloadType = {
  id: number;
  login: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        maxAge: '15m',
      },
      secretOrKey: 'at-secret123',
    });
  }

  validate(payload: PayloadType): PayloadType {
    return payload;
  }
}
