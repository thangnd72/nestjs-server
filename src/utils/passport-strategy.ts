import { JwtPayload } from './../models/jwt-payload';
import { AuthService } from '@services/auth';
import { PassportStrategy } from '@nestjs/passport';
import {
  CACHE_MANAGER,
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

interface GraphUser {
  id: string;
  displayName: string;
  givenName: string;
  jobTitle: string | null;
  mail: string;
  mobilePhone: string | null;
  officeLocation: string | null;
  preferredLanguage: string | null;
  surname: string;
  userPrincipalName: string;
}

export interface CurrentUser {
  graphUser: GraphUser;
  dbUser: UserDocument;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwtsecretkey',
    });
  }
  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    }
    return done(null, user);
  }
}
