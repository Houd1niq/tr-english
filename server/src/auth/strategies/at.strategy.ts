import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { RevokedTokensService } from '../revokedTokens.service';

export type PayloadType = {
  id: number;
  login: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private revokedTokenService: RevokedTokensService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromExtractors([AtStrategy.getFromBearer]),
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        maxAge: '60m',
      },
      secretOrKey: 'at-secret123',
    });
  }

  async validate(payload: PayloadType) {
    const isRevoked = await this.revokedTokenService.checkIfRevoked(payload.id);
    if (isRevoked) return false;
    return payload;
  }
}
