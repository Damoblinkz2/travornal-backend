/**
 * Data Transfer Objects (DTOs) for authentication.
 * Defines validation rules for user signup and login data.
 */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO for user signup.
 * Contains username, email, and password with validation.
 */
export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

/**
 * DTO for user login.
 * Contains email and password with validation.
 */
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
