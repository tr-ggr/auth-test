import {
  Contains,
  IS_LENGTH,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class UserAuth {
  @IsEmail()
  @Contains('@cit.edu')
  readonly email: string;

  @MinLength(8)
  readonly password: string;
}
