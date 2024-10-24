import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginResponse } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { nama, nik, no_tlp, password, role, id_pj_cabang } = createUserDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    return await this.prisma.user.create({
      data: {
        nama,
        nik,
        no_tlp,
        password: hashedPassword, // Store the hashed password
        role: role ?? 'pj_cabang', // Default role
        id_pj_cabang,
      },
    });
  }

  async verify(nik: string, password: string): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({ where: { nik } });

    if (!user) {
      return null; // User not found
    }

    // Compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { id, nama, role, id_pj_cabang } = user;
      return { id, nama, role, id_pj_cabang };
    }

    return null;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
