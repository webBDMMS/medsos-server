export interface MasterUnitPjIntf {
  id: number;
  id_unit: number | null;
  pj_pusat: number | null;
  id_cabang: number | null;
  cabang: string | null;
  id_kota: number | null;
  kota: string | null;
  unit: string | null;
  nama_gedung: string | null;
  is_sekretariat: string | null;
  id_pj_cabang: string | null;
  nama_pj_cabang: string;
  updated_at: Date | null;
  created_at: Date | null;
  alamat: string | null;
}
