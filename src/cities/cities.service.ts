/**
 * Cities service.
 * Handles business logic for city-related operations including CRUD operations.
 */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CitiesDto } from './dto';
import { Cities, CitiesDocument } from 'src/schemas/cities.schema';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(Cities.name) private cityModel: Model<CitiesDocument>,
  ) {}

  /**
   * Retrieves all cities for a specific user.
   * @param user - User ID to filter cities.
   * @returns Array of cities with populated user data.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async getCities(user: string) {
    try {
      const getAllCities = await this.cityModel.find({
        user: new Types.ObjectId(user),
      });
      return getAllCities;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to retrieve cities');
    }
  }

  /**
   * Retrieves a specific city by ID.
   * @param id - City ID to retrieve.
   * @returns City data with populated user information.
   * @throws NotFoundException if city not found.
   * @throws InternalServerErrorException for other errors.
   */
  async getCity(id: string) {
    try {
      const getCity = await this.cityModel.findById(id).populate('user');
      if (!getCity) {
        throw new NotFoundException('City not found');
      }
      return getCity;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve city');
    }
  }

  /**
   * Creates a new city for a user.
   * @param userId - ID of the user creating the city.
   * @param dto - City data to create.
   * @returns Created city document.
   * @throws InternalServerErrorException if creation fails.
   */
  async postCities(userId: string, dto: CitiesDto): Promise<Cities> {
    try {
      const newDate = new Date(); // Current timestamp

      const addCity = new this.cityModel({
        ...dto,
        date: newDate,
        user: new Types.ObjectId(userId), // Convert userId to ObjectId
      });

      return await addCity.save();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create city');
    }
  }
}
