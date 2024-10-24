import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateNoTlpDto {
  @ApiProperty({ description: 'id unit', type: Number })
  @IsNumber()
  @IsNotEmpty()
  id_unit: number;

  @ApiProperty({ description: 'no telepon', type: String })
  @IsString()
  @IsNotEmpty()
  no_telepon: string;

  @ApiProperty({ description: 'penanggung jawab pemegang nomor', type: String })
  @IsString()
  @IsNotEmpty()
  penanggung_jawab: string;

  @ApiProperty({
    description: 'provider nomor telepon yang digunakan',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  provider: string;

  @ApiProperty({
    description: 'tanggal aktif',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) // Transforms input string to Date
  tanggal_aktif: Date;

  @ApiProperty({
    description: 'tanggal non-aktif',
    type: Date,
  })
  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  @Type(() => Date) // Transforms input string to Date
  tanggal_non_aktif?: Date;
}
