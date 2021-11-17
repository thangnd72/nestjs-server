import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ModelName } from './01.model-names';

@Schema()
export abstract class SchemaBase {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelName.User,
  })
  createdBy!: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: ModelName.User,
  })
  modifiedBy!: string;
}
