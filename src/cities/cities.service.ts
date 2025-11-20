import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CitiesDto } from './dto';
import { Cities, CitiesDocument } from 'src/schemas/cities.schema';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(Cities.name) private cityModel: Model<CitiesDocument>,
  ) {}
  cities() {}

  postCities(userId: string, dto: CitiesDto): Promise<Cities> {
    //save the user in db
    const newDate = new Date();

    const addCity = new this.cityModel({
      ...dto,
      date: newDate,
      user: new Types.ObjectId(userId),
    });

    return addCity.save();
  }
}
