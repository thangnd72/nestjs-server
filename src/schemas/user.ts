import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { applyPlugins } from '../utils/apply-plugins';
import { SchemaBase } from './00.schema-base';

export type UserDocument = User & mongoose.Document;

@Schema({
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified',
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  created?: Date;

  @Prop({ required: false })
  isActive?: boolean;
}

export const UserSchema = applyPlugins(SchemaFactory.createForClass(User));
