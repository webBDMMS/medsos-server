import {
  Controller,
  Get,
  Param,
  Query,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { SekretariatService } from './sekretariat.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
// import { CreateSekretariatDto } from './dto/create-sekretariat.dto';
// import { UpdateSekretariatDto } from './dto/update-sekretariat.dto';

@Controller('sekretariat')
@ApiTags('Sekretariat')
export class SekretariatController {
  constructor(private readonly sekretariatService: SekretariatService) {}
  @Get()
  @ApiOperation({ summary: 'Get Sekretariat' })
  @ApiQuery({ name: 'idpjcabang', example: '2', required: false })
  findAll(@Query('idpjcabang') idPjCabang?: string) {
    if (idPjCabang) {
      return this.sekretariatService.findByPjCabang(idPjCabang);
    }

    return this.sekretariatService.findAll();
  }

  @Get('kotago')
  @ApiOperation({ summary: 'kosongkan id untuk get semua kota' })
  @ApiQuery({ name: 'idpjcabang', example: '2', required: false })
  getKotaGo(@Query('idpjcabang') idPjCabang?: string) {
    if (idPjCabang) {
      return this.sekretariatService.getKotaByPj(idPjCabang);
    }
    return this.sekretariatService.getAllKotaGo();
  }

  @Get('getsekrebykota/:kota')
  @ApiOperation({ summary: 'Get Sekretariat by kota' })
  getSekreByKota(@Param('kota') kota: string) {
    return this.sekretariatService.getSekrebyKota(kota);
  }

  @Get(':idsekre')
  @ApiOperation({ summary: 'Get Detail Sekretariat' })
  getDetailSekre(@Param('idsekre') id: string) {
    const numericId = Number(id);

    return this.sekretariatService.findOne(numericId);
  }
}
