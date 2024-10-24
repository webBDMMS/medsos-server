import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateNoTlpDto } from './dto/create-no_tlp.dto';
// import { UpdateNoTlpDto } from './dto/update-no_tlp.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { noTlpIntf } from 'src/interface/no_tlp.intf';
import { CreateNoTlpDto } from './dto/create-no_tlp.dto';
import { UpdateNoTlpDto } from './dto/update-no_tlp.dto';
@Injectable()
export class NoTlpService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    try {
      return this.prisma.asset_telepon.findMany();
    } catch (error) {
      throw error;
    }
  }
  async insertTelp(body: CreateNoTlpDto) {
    return await this.prisma.asset_telepon.create({ data: body });
  }
  async deleteOne(id: number) {
    try {
      const existingRecord = await this.prisma.asset_telepon.findUnique({
        where: { id: id },
      });
      if (!existingRecord) {
        return {
          statusCode: 404,
          message: `Telepon dengan ID ${id} tidak ditemukan.`,
        };
      }
      await this.prisma.asset_telepon.delete({
        where: { id: id },
      });
      return {
        statusCode: 200,
        message: `Telepon dengan ID ${id} berhasil dihapus.`,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        return {
          statusCode: 404,
          message: `Telepon dengan ID ${id} tidak ditemukan.`,
        };
      }

      return {
        statusCode: 500,
        message: `Terjadi kesalahan saat menghapus telepon dengan ID ${id}.`,
        error: error.message,
      };
    }
  }
  async editById(id: number, updateData: UpdateNoTlpDto): Promise<noTlpIntf> {
    // Cek apakah data dengan ID tersebut ada
    const existingRecord = await this.prisma.asset_telepon.findUnique({
      where: { id: id },
    });

    // Jika data tidak ditemukan, lemparkan NotFoundException
    if (!existingRecord) {
      throw new NotFoundException(`Telepon dengan ID ${id} tidak ditemukan.`);
    }

    // Lakukan update
    const updatedRecord = await this.prisma.asset_telepon.update({
      where: { id: id },
      data: updateData,
    });

    // Kembalikan data yang telah diperbarui dengan mengonversi ke tipe noTlpIntf
    return {
      id: updatedRecord.id,
      id_unit: updatedRecord.id_unit,
      no_telepon: updatedRecord.no_telepon,
      provider: updatedRecord.provider,
      tanggal_aktif: updatedRecord.tanggal_aktif?.toISOString() || null,
      tanggal_non_aktif: updatedRecord.tanggal_non_aktif?.toISOString() || null,
      penanggung_jawab: updatedRecord.penanggung_jawab,
      is_published: updatedRecord.is_published,
      created_at: updatedRecord.created_at || null,
      updated_at: updatedRecord.updated_at || null,
      id_sekretariat: updatedRecord.id_sekretariat,
    };
  }

  async getNoTelpByIdUnit(idUnit: number): Promise<noTlpIntf[]> {
    try {
      const teleponRecords = await this.prisma.asset_telepon.findMany({
        where: {
          id_unit: idUnit,
        },
      });

      // Convert Date to string for tanggal_aktif and tanggal_non_aktif
      const formattedRecords = teleponRecords.map((record) => ({
        ...record,
        tanggal_aktif: record.tanggal_aktif
          ? record.tanggal_aktif.toISOString()
          : null,
        tanggal_non_aktif: record.tanggal_non_aktif
          ? record.tanggal_non_aktif.toISOString()
          : null,
      }));

      return formattedRecords;
    } catch (error) {
      throw error;
    }
  }
}
