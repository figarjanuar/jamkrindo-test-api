import { Request, Response } from 'express';
import * as klaimService from '../services/klaimService';

export const getAllKlaim = async (req: Request, res: Response) => {
  try {
    const klaim = await klaimService.getAllKlaim();
    res.json({ status: 'success', data: klaim });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan server' });
  }
};

export const getKlaimByLOB = async (req: Request, res: Response) => {
  try {
    const { lob } = req.params;
    const klaim = await klaimService.getKlaimByLOB(lob);
    res.json({ status: 'success', data: klaim });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan server' });
  }
};

export const sendKlaimToPenampungan = async (req: Request, res: Response) => {
  try {
    await klaimService.sendKlaimToPenampungan('KUR');
    await klaimService.sendKlaimToPenampungan('PEN');
    res.json({ status: 'success', message: 'Data berhasil dikirim ke database penampungan' });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan saat mengirim data' });
  }
};

export const addKlaim = async (req: Request, res: Response) => {
  try {
    const newKlaim = req.body;
    const addedKlaim = await klaimService.addKlaim(newKlaim);
    res.json({ status: 'success', data: addedKlaim });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan saat menambahkan data' });
  }
};

export const getActivityLogs = async (req: Request, res: Response) => {
  try {
    const logs = await klaimService.getActivityLogs();
    res.json({ status: 'success', data: logs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan saat mengambil log aktivitas' });
  }
};