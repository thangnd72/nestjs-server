import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '@services/user';
import { ParseObjectIdPipe } from '@utils/parse-object-id-pipe';
import { Request as ExRequest } from 'express';
import { JoiValidationPipe } from '../../utils/joi-validation-pipe';
import { createUserValidation, updateUserValidation } from './user-validation';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('/getAllUsers')
  getAllUsers(@Body() body: ExRequest['body']) {
    return this.userService.paginate(body.query, body.options);
  }

  @Post('/getAllUserNoLimit')
  getAllItemNoLimit(@Body() body: ExRequest['body']) {
    return this.userService.findAll(body.query, body.options);
  }

  @Post('/users')
  @UsePipes(new JoiValidationPipe(createUserValidation))
  addUser(@Body() body: ExRequest['body']) {
    return this.userService.create(body);
  }

  @Post('/users/:id')
  updateBktt(
    @Param('id', new ParseObjectIdPipe())
    id: string,
    @Body(new JoiValidationPipe(updateUserValidation))
    body: ExRequest['body'],
  ) {
    return this.userService.findByIdAndUpdate(id, body);
  }

  @Delete('/users/:id')
  deleteUser(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.userService.findByIdAndDelete(id);
  }

  @Get('/users/:id')
  getUser(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.userService.findById(id);
  }
}
