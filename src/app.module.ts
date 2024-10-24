import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { NoTlpModule } from './asetdigital/no_tlp/no_tlp.module';
import { InstagramModule } from './asetdigital/instagram/instagram.module';
import { GmapsModule } from './asetdigital/gmaps/gmaps.module';
import { PrismaService } from './prisma/prisma.service';

import { SekretariatModule } from './sekretariat/sekretariat.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    UserModule,

    NoTlpModule,
    InstagramModule,
    GmapsModule,
    SekretariatModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
