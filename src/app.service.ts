/**
 * Main application service.
 * Provides basic application logic and utilities.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a hello message.
   * @returns A simple greeting string.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
