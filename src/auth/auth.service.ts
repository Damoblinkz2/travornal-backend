import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from 'src/schemas/users.schema';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    // Check if user already exists
    const existingUser = await this.usersModel.findOne({ email: dto.email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPass = await argon.hash(dto.password);

    // Create user
    const createdUser = new this.usersModel({
      username: dto.username,
      email: dto.email,
      passwords: hashedPass,
    });

    const savedUser = await createdUser.save();

    // Remove password before returning
    const { passwords, ...userWithoutPassword } = savedUser.toObject();
    console.log(passwords);
    return userWithoutPassword;
  }

  async login(dto: AuthDto) {
    // Fetch user and include password (because select: false hides it)
    const user = await this.usersModel
      .findOne({ email: dto.email })
      .select('+passwords');

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await argon.verify(user.passwords, dto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // JWT payload
    const payload = { email: user.email, sub: user._id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
