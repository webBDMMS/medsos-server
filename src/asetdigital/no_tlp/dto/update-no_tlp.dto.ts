import { PartialType } from '@nestjs/mapped-types';
import { CreateNoTlpDto } from './create-no_tlp.dto';

export class UpdateNoTlpDto extends PartialType(CreateNoTlpDto) {}
