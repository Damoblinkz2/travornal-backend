import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CitiesDocument = HydratedDocument<Cities>;

@Schema()
export class Cities {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CitiesSchema = SchemaFactory.createForClass(Cities);
