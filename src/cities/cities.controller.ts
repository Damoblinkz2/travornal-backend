import { Controller, Post, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get('all')
  signup() {
    return this.citiesService.signup();
  }

  @Post('all')
  login() {
    return this.citiesService.login();
  }
}
