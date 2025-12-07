/**
 * Authentication module.
 * Configures authentication-related services, controllers, and dependencies.
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // Register the Users schema with Mongoose
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    // Initialize Passport for authentication
    PassportModule,
    // Configure JWT module with secret and expiration
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
