/**
 * Main application controller.
 * Handles basic application routes like the root endpoint.
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * GET / - Returns a hello message.
   * @returns A string greeting from the application service.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
