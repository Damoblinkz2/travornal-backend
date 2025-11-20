import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesDto } from './dto';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get('all')
  getCities() {
    return this.citiesService.cities();
  }

  @Post('all')
  postCity(@Req() req: Request, @Body() dto: CitiesDto) {
    const userId = '';
    // const userId = req.user['_id'];
    return this.citiesService.postCities(userId, dto);
  }
}
