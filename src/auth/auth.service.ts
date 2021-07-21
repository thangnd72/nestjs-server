import { CreateUserDto } from '@user/dto/create-user.dto';
import { Injectable, ConflictException } from '@nestjs/common';
import { UserService } from 'user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(user: CreateUserDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: CreateUserDto = {
      ...user,
      password: hashedPassword,
    };
    await this.userService.create(newUser);
  }
}
