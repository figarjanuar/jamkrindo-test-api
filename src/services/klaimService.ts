import { Klaim } from '../types/klaim';
import { dbAplikasi, dbPenampungan } from '../config/database';
import { OkPacket, RowDataPacket } from 'mysql2';

export const getAllKlaim = async (): Promise<Klaim[]> => {
  const [rows] = await dbAplikasi.query<RowDataPacket[]>('SELECT * FROM klaim_per_lob ORDER BY lob');
  return rows as Klaim[];
};

export const getKlaimByLOB = async (lob: string): Promise<Klaim[]> => {
  const [rows] = await dbAplikasi.query<RowDataPacket[]>('SELECT * FROM klaim_per_lob WHERE lob = ?', [lob]);
  return rows as Klaim[];
};

export const getUnbackup = async (lob: string): Promise<Klaim[]> => {
  const [rows] = await dbAplikasi.query<RowDataPacket[]>('SELECT * FROM klaim_per_lob WHERE is_backup = 0 and lob = ?', [lob]);
  return rows as Klaim[];
};

export const sendKlaimToPenampungan = async (lob: string): Promise<void> => {
  const klaim = await getUnbackup(lob);

  if(klaim.length === 0) {
    return
  }

  for (const item of klaim) {
    await dbPenampungan.query<OkPacket>(
      'INSERT INTO rekap_klaim (lob, penyebab_klaim, periode, nilai_beban_klaim) VALUES (?, ?, ?, ?)',
      [item.lob, item.penyebab_klaim, item.periode, item.nilai_beban_klaim]
    );
  }

  await updateBackupStatus(lob)

  await logActivity(`Mengirim data ${lob} ke database penampungan`, klaim.length);
};

export const addKlaim = async (klaim: Omit<Klaim, 'id'>): Promise<Klaim> => {
  const [result] = await dbAplikasi.query<OkPacket>(
    'INSERT INTO klaim_per_lob (lob, penyebab_klaim, periode, nilai_beban_klaim, jumlah_nasabah) VALUES (?, ?, ?, ?, ?)',
    [klaim.lob, klaim.penyebab_klaim, klaim.periode, klaim.nilai_beban_klaim, klaim.jumlah_nasabah]
  );
  
  const newKlaim: Klaim = { id: result.insertId, ...klaim };
  return newKlaim;
};

export const updateBackupStatus = async (lob: string): Promise<void> => {
  await dbAplikasi.query<OkPacket>(
    'UPDATE klaim_per_lob SET is_backup = 1 WHERE is_backup = 0 AND lob = ?',
    [lob] 
  );
};

export const logActivity = async (description: string, dataCount: number): Promise<void> => {
  await dbAplikasi.query(
    'INSERT INTO log_aktivitas (tanggal_proses, jumlah_data_dikirim, keterangan) VALUES (NOW(), ?, ?)',
    [dataCount, description]
  );
};

export const getActivityLogs = async (): Promise<any[]> => {
  const [rows] = await dbAplikasi.query<RowDataPacket[]>('SELECT * FROM log_aktivitas ORDER BY tanggal_proses DESC');
  return rows;
};