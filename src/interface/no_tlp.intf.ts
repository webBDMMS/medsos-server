export interface noTlpIntf {
  id: number; // ID unik untuk telepon
  id_unit?: number; // ID unit, nullable
  no_telepon?: string; // Nomor telepon, nullable
  provider?: string; // Nama provider, nullable
  tanggal_aktif?: string; // Tanggal aktif, nullable
  tanggal_non_aktif?: string; // Tanggal non-aktif, nullable
  penanggung_jawab?: string; // Penanggung jawab, nullable
  is_published?: string; // Status publikasi, nullable
  created_at?: Date | null; // Tanggal dibuat, nullable
  updated_at?: Date | null; // Tanggal diperbarui, nullable
  id_sekretariat?: string; // ID sekretariat, nullable
}
