/**
 * Mongoose schema for Users collection.
 * Defines the structure and validation for user documents in the database.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false }) // Hidden by default in queries
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
