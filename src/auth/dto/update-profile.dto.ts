import { PartialType } from '@nestjs/swagger';
import { ProfileDTO } from './profile.dto';

export class UpdateProfileDTO extends PartialType(ProfileDTO) {}
