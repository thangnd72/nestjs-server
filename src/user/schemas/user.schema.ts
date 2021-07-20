import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  description?: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  created?: Date;

  @Prop()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);