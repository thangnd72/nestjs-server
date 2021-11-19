import { JwtPayload } from './../models/jwt-payload';
import { AuthService } from '@services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import {
  CACHE_MANAGER,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDocument } from '@schemas/user';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Cache } from 'cache-manager';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { ModelName } from '@schemas/01.model-names';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'jwt',
      },
      async (payload: JwtPayload, done: VerifiedCallback) => {
        const user = await this.authService.validateUser(payload);
        if (!user) {
          return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }
        return done(null, user);
      },
    );
  }
}
