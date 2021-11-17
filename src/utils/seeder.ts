import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelName } from '@schemas/01.model-names';
import { UserDocument } from '@schemas/user';
import * as mongoose from 'mongoose';

@Injectable()
export class Seeder {
  constructor(
    @InjectModel(ModelName.User)
    protected userModel: mongoose.PaginateModel<UserDocument>,
  ) {}

  async seed() {
    const count = await this.userModel.collection.countDocuments();
    if (count === 0) {
      await this.userModel.collection.insertOne({
        FullName: 'Administrator 1',
        LoginName: 'adminm@fxp.vn',
        IsActive: true,
      });
    }
  }
}
