import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Trim } from '@helpers/transformer.helpers';
export class UserDto {

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  lastName?: string;

  @IsString()
  description?: string;
  
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Trim()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password is too short (6 characters min)' })
  @MaxLength(18, { message: 'Password is too long (18 characters max)' })
  password: string;

  created?: Date;
}
