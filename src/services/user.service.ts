import { AuthService } from '@services/auth.service';
import * as mongoose from 'mongoose';
import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { assign, set, uniqBy, flattenDeep, cloneDeep } from 'lodash';
import { ModelName } from '@schemas/01.model-names';
import { UserDocument } from '@schemas/user';
import { ServiceBase } from '@services/00.service-base';
import { JwtPayload } from '@models/jwt-payload';
import { compareSync, hashSync } from 'bcryptjs';

@Injectable({ scope: Scope.REQUEST })
export class UserService extends ServiceBase<UserDocument> {
  constructor(
    @Inject(REQUEST) protected request: Request,
    @InjectModel(ModelName.User)
    protected model: mongoose.PaginateModel<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    super(request);
  }

  async register(newUser: UserDocument) {
    let user = await this.findOne({ email: newUser.email });
    if (user) throw new BadRequestException('error.UserExist');

    user = await this.create({
      ...newUser,
      created: new Date(),
      password: await hashSync(newUser.password),
    });

    return user.id;
  }
}
