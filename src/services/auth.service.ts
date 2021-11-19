import { compareSync } from 'bcryptjs';
import { JwtPayload } from '@models/jwt-payload';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDocument } from '@schemas/user';
import { UserService } from '@services/user.service';
import { sign, SignOptions } from 'jsonwebtoken';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  constructor(
    @Inject(REQUEST) protected request: Request,
    @Inject(forwardRef(() => UserService))
    readonly userService: UserService,
  ) {
    this.jwtOptions = { expiresIn: '12h' };
    this.jwtKey = 'jwtsecretkey';
  }

  async signPayload(payload: JwtPayload): Promise<string> {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }

  async validateUser(payload: JwtPayload): Promise<UserDocument> {
    return this.userService.findOne({
      email: payload.email.toLowerCase(),
    });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOne({ email: email });

    if (!user)
      throw new BadRequestException('error.UsernameOrPasswordIncorrect');

    const isMatch = await compareSync(password, user.password);

    if (!isMatch)
      throw new UnauthorizedException('error.EmailOrPasswordInCorrect');

    const payload: JwtPayload = {
      email: user.email,
    };

    const token = await this.signPayload(payload);

    console.log(user);

    return {
      accessToken: token,
    };
  }
}
