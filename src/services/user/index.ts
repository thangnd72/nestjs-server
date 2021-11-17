import * as mongoose from 'mongoose';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { assign, set, uniqBy, flattenDeep, cloneDeep } from 'lodash';
import { ModelName } from '@schemas/01.model-names';
import { UserDocument } from '@schemas/user';
import { ServiceBase } from '@services/00.service-base';

@Injectable({ scope: Scope.REQUEST })
export class UserService extends ServiceBase<UserDocument> {
  constructor(
    @Inject(REQUEST) protected request: Request,
    @InjectModel(ModelName.User)
    protected model: mongoose.PaginateModel<UserDocument>,
  ) {
    super(request);
  }
}
