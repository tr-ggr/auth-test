import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class MessageDTO {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly content: string;

  readonly sendToUserID: string;
}
