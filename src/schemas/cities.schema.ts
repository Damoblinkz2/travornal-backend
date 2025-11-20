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
  emoji: string;

  @Prop()
  date: string;

  @Prop()
  notes: string;

  @Prop([{ type: { lat: Number, lng: Number } }])
  position: { name: number; lng: number }[];

  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  user: Types.ObjectId;
}

export const CitiesSchema = SchemaFactory.createForClass(Cities);
