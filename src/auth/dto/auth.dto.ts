import { Trim } from '@helpers/transformer.helpers';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short (6 characters min)' })
  @MaxLength(18, { message: 'Password is too long (18 characters max)' })
  password: string;
}
