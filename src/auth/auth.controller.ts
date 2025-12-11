/**
 * Authentication controller.
 * Handles HTTP requests for user signup and login.
 */
import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
// import * as dto from './dto'; // Commented out alternative import
import { AuthDto, LoginDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

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

  /**
   * GET /auth/verify - Verify user token.
   * @param  //userid
   * @returns status code 200.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('verify')
  verify(@Req() req: Request) {
    const userId = req.user!.userId;
    return this.authService.verify(userId);
  }
}
