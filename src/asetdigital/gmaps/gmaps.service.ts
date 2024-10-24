import { Injectable } from '@nestjs/common';
import { CreateGmapDto } from './dto/create-gmap.dto';
import { UpdateGmapDto } from './dto/update-gmap.dto';

@Injectable()
export class GmapsService {
  create(createGmapDto: CreateGmapDto) {
    return 'This action adds a new gmap';
  }

  findAll() {
    return `This action returns all gmaps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gmap`;
  }

  update(id: number, updateGmapDto: UpdateGmapDto) {
    return `This action updates a #${id} gmap`;
  }

  remove(id: number) {
    return `This action removes a #${id} gmap`;
  }
}
