import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '@auth/auth.service'
import { CreateUserDto } from '@user/dto/create-user.dto';
import { AllowAnonymous } from '@helpers/decorator.helpers';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @AllowAnonymous()
  async signUp(@Body() user: CreateUserDto): Promise<void> {
    return await this.authService.signUp(user);
  }
}
