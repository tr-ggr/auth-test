import { IsBoolean, IsString } from 'class-validator';

export class ProfileDTO {
  @IsString()
  readonly username: string;

  @IsBoolean()
  readonly isAnonymous: boolean;
}
