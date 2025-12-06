import * as dotenv from 'dotenv';
dotenv.config();

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_TOKEN;

    if (!secret) {
      throw new Error('JWT_TOKEN is not defined in .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  validate(payload: { sub: string; email: string }): {
    userId: string;
    email: string;
  } {
    return { userId: payload.sub, email: payload.email };
  }
}
