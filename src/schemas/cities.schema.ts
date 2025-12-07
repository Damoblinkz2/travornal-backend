/**
 * Mongoose schema for Cities collection.
 * Defines the structure and validation for city documents in the database.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from './users.schema';

export type CitiesDocument = HydratedDocument<Cities>;

@Schema()
export class Cities {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  countryCode: string;

  @Prop()
  date: string; // Date when the city was added

  @Prop()
  notes: string; // Optional notes about the city

  @Prop({
    type: { lat: Number, lng: Number },
    required: true,
  })
  position: { lat: number; lng: number };

  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  user: Types.ObjectId; // Reference to the user who added the city
}

export const CitiesSchema = SchemaFactory.createForClass(Cities);
