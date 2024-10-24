import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GmapsService } from './gmaps.service';
import { CreateGmapDto } from './dto/create-gmap.dto';
import { UpdateGmapDto } from './dto/update-gmap.dto';

@Controller('gmaps')
export class GmapsController {
  constructor(private readonly gmapsService: GmapsService) {}

  @Post()
  create(@Body() createGmapDto: CreateGmapDto) {
    return this.gmapsService.create(createGmapDto);
  }

  @Get()
  findAll() {
    return this.gmapsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gmapsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGmapDto: UpdateGmapDto) {
    return this.gmapsService.update(+id, updateGmapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gmapsService.remove(+id);
  }
}
