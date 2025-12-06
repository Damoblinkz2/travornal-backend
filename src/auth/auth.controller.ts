import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import * as dto from './dto';
import { AuthDto, LoginDto } from './dto/auth.dto';
// import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
