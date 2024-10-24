import { Module } from '@nestjs/common';
import { NoTlpService } from './no_tlp.service';
import { NoTlpController } from './no_tlp.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [NoTlpController],
  providers: [NoTlpService],
})
export class NoTlpModule {}
