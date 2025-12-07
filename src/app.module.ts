/**
 * Root application module.
 * Configures the main application dependencies, modules, and database connection.
 */
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { ConfigModule } from '@nestjs/config';

// Ensure DB environment variable is defined
if (!process.env.DB) {
  throw new Error('DB environment variable is not defined');
}

@Module({
  imports: [
    ConfigModule.forRoot({}), // Load configuration from environment
    AuthModule, // Authentication module
    CitiesModule, // Cities management module
    MongooseModule.forRoot(process.env.DB), // Connect to MongoDB
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
