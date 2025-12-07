/**
 * Authentication controller.
 * Handles HTTP requests for user signup and login.
 */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import * as dto from './dto'; // Commented out alternative import
import { AuthDto, LoginDto } from './dto/auth.dto';
// import express from 'express'; // Commented out unused import

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/signup - Handles user registration.
   * @param dto - Signup data (username, email, password).
   * @returns User data without password.
   */
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  /**
   * POST /auth/login - Handles user login.
   * @param dto - Login data (email, password).
   * @returns JWT access token.
   */
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
