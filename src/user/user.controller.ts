import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'User created successfully',
      user,
    });
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { nik, password } = loginUserDto;
    const user = await this.userService.verify(nik, password);

    if (user) {
      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        data: {
          id: user.id,
          nama: user.nama,
          role: user.role,
          id_pj_cabang: user.id_pj_cabang,
        },
      });
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
