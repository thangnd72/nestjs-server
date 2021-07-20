import { UserDto } from './use.dto';

export class UpdateUserDto extends UserDto {
  completedAt: Date;
}