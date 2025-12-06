import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { CitiesService } from './cities.service';
import { CitiesDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getCities() {
    return this.citiesService.getCities();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getCity(@Req() req: Request) {
    const cityId = (req as any).params;
    return this.citiesService.getCity(cityId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('all')
  postCity(@Req() req: Request, @Body() dto: CitiesDto) {
    const userId = '';
    // const userId = req.user['_id'];
    return this.citiesService.postCities(userId, dto);
  }
}
