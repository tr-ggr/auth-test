import { IS_LENGTH, IsEmail, IsString, MinLength } from 'class-validator';

export class UserAuth {
  @IsEmail()
  readonly email: string;

  @MinLength(8)
  readonly password: string;
}
