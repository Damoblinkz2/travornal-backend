/**
 * Cities module.
 * Configures the cities feature with controllers, services, and database schema.
 */
import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cities, CitiesSchema } from 'src/schemas/cities.schema';

@Module({
  imports: [
    // Register the Cities schema with Mongoose
    MongooseModule.forFeature([{ name: Cities.name, schema: CitiesSchema }]),
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [MongooseModule], // Export MongooseModule for use in other modules
})
export class CitiesModule {}
