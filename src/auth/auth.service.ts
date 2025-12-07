/**
 * Authentication service.
 * Handles user signup, login, password hashing, and JWT token generation.
 */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from 'src/schemas/users.schema';
import { AuthDto } from './dto';
import { LoginDto } from './dto';
import * as argon from 'argon2'; // For password hashing
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  /**
   * Handles user signup.
   * Checks for existing user, hashes password, creates new user, and returns user data without password.
   * @param dto - Signup data containing username, email, and password.
   * @returns User object without password field.
   * @throws BadRequestException if user already exists.
   * @throws InternalServerErrorException for other errors.
   */
  async signup(dto: AuthDto) {
    try {
      // Check if user already exists
      const existingUser = await this.usersModel.findOne({ email: dto.email });
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }

      // Hash password using Argon2
      const hashedPass = await argon.hash(dto.password);

      // Create new user document
      const createdUser = new this.usersModel({
        username: dto.username,
        email: dto.email,
        passwords: hashedPass,
      });

      const savedUser = await createdUser.save();

      // Remove password from response
      const { password, ...userWithoutPassword } = savedUser.toObject();
      console.log(password); // Log for debugging
      return userWithoutPassword;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Signup failed');
    }
  }

  /**
   * Handles user login.
   * Verifies user credentials, generates JWT token if valid.
   * @param dto - Login data containing email and password.
   * @returns Object with access_token.
   * @throws UnauthorizedException for invalid credentials.
   * @throws InternalServerErrorException for other errors.
   */
  async login(dto: LoginDto) {
    try {
      // Fetch user including password field (normally hidden)
      const user = await this.usersModel
        .findOne({ email: dto.email })
        .select('+password');

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password using Argon2
      const isPasswordValid = await argon.verify(user.password, dto.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Create JWT payload
      const payload = { email: user.email, sub: user._id };
      const access_token = this.jwtService.sign(payload);

      return { access_token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Login failed');
    }
  }
}
