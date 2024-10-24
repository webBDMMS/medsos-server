import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Role } from '@prisma/client'; // Import Role from Prisma client

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  nik: string;

  @IsNotEmpty()
  @IsString()
  no_tlp: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  id_pj_cabang?: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  nik: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

// Exporting LoginResponse as an interface
export interface LoginResponse {
  id: string;
  nama: string;
  role?: Role;
  id_pj_cabang?: string;
}
