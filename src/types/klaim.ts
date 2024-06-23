// src/types/klaim.ts
export interface Klaim {
    id: number;
    lob: string;
    penyebab_klaim: string;
    periode: Date;
    nilai_beban_klaim: number;
    jumlah_nasabah: number;
  }