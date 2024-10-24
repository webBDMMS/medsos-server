import { PartialType } from '@nestjs/mapped-types';
import { CreateGmapDto } from './create-gmap.dto';

export class UpdateGmapDto extends PartialType(CreateGmapDto) {}
