import { AuthService } from '@services/auth.service';
import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { UserService } from '@services/user.service';
import { Request as ExRequest } from 'express';
import { JwtAuthGuard } from '@utils/passport-guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/login')
  // @UsePipes(new JoiValidationPipe(createUserValidation))
  loginApp(@Body() body: ExRequest['body']) {
    return this.authService.login(body.email, body.password);
  }
}
