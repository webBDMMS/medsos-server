import { PartialType } from '@nestjs/mapped-types';
import { CreateSekretariatDto } from './create-sekretariat.dto';

export class UpdateSekretariatDto extends PartialType(CreateSekretariatDto) {}
