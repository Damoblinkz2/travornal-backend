/**
 * Main entry point for the NestJS application.
 * Loads environment variables, sets up global validation pipes, and starts the server.
 */

import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Ensure PORT environment variable is defined
if (!process.env.PORT) {
  throw new Error('Port environment variable is not defined');
}

/**
 * Bootstrap function to initialize and start the NestJS application.
 * Sets up global validation pipes and listens on the specified port.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation pipe for request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in DTOs
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are provided
      transform: true, // Transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit type conversion
      },
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
  });

  // Start the server on the specified port
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
