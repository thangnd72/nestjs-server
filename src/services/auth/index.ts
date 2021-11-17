import { JwtPayload } from '@models/jwt-payload';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserDocument } from '@schemas/user';
import { UserService } from '@services/user';
import { sign, SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  constructor(
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
      username: payload.username.toLowerCase(),
    });
  }
}
