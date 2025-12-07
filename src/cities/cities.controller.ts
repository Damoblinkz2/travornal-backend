/**
 * Cities controller.
 * Handles HTTP requests for city-related operations, protected by JWT authentication.
 */
import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { CitiesService } from './cities.service';
import { CitiesDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  /**
   * GET /cities/all - Retrieves all cities for the authenticated user.
   * @param req - Express request object containing user info.
   * @returns List of cities for the user.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getCities(@Req() req: Request) {
    const userId = req.user!.userId;
    console.log(userId);
    return this.citiesService.getCities(userId);
  }

  /**
   * GET /cities/:id - Retrieves a specific city by ID.
   * @param req - Express request object containing route params.
   * @returns City data.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getCity(@Req() req: Request) {
    const cityId = req.params.id;
    return this.citiesService.getCity(cityId);
  }

  /**
   * POST /cities/all - Creates a new city for the authenticated user.
   * @param req - Express request object containing user info.
   * @param dto - City data to create.
   * @returns Created city data.
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('all')
  postCity(@Req() req: Request, @Body() dto: CitiesDto) {
    const userId = req.user!.userId;
    return this.citiesService.postCities(userId, dto);
  }
}
