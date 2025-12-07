/**
 * JWT strategy for Passport authentication.
 * Validates JWT tokens and extracts user information from payload.
 */
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secret = process.env.JWT_TOKEN;

    if (!secret) {
      throw new Error('JWT_TOKEN is not defined in .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      secretOrKey: secret, // Secret key for verifying JWT
    });
  }

  /**
   * Validates the JWT payload and returns user information.
   * @param payload - Decoded JWT payload containing user data.
   * @returns Object with userId and email.
   */
  validate(payload: { sub: string; email: string }): {
    userId: string;
    email: string;
  } {
    return { userId: payload.sub, email: payload.email };
  }
}
