import { Module } from '@nestjs/common';
import { SekretariatService } from './sekretariat.service';
import { SekretariatController } from './sekretariat.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SekretariatController],
  providers: [SekretariatService],
})
export class SekretariatModule {}
