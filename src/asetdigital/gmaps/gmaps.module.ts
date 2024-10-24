import { Module } from '@nestjs/common';
import { GmapsService } from './gmaps.service';
import { GmapsController } from './gmaps.controller';

@Module({
  controllers: [GmapsController],
  providers: [GmapsService],
})
export class GmapsModule {}
