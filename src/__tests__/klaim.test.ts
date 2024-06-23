import request from 'supertest';
import { app, server } from '../server';
import { dbAplikasi, dbPenampungan } from '../config/database';
import * as klaimService from '../services/klaimService';

let mockKlaim

afterAll(async () => {
  server.close();
  await dbAplikasi.end();
  await dbPenampungan.end();
});

describe('GET /api/klaim', () => {

  it('should return all klaim data', async () => {
    mockKlaim = jest.spyOn(klaimService, 'getAllKlaim')
      .mockResolvedValue([{
        id: 1,
        jumlah_nasabah: 1,
        lob: 'KUR',
        nilai_beban_klaim: 10,
        penyebab_klaim: 'test',
        periode: new Date('2023-01-01')
      }])

    const res = await request(app).get('/api/klaim');
    
    expect(res.statusCode).toBe(200);
  });

  it('should return 500 when fail fetch data', async () => {
    mockKlaim = jest.spyOn(klaimService, 'getAllKlaim')
      .mockRejectedValue('')

    const res = await request(app).get('/api/klaim');
    expect(res.statusCode).toBe(500);
  });
});

describe('POST /api/klaim', () => {

  it('should return 200', async () => {
    mockKlaim = jest.spyOn(klaimService, 'addKlaim')
      .mockResolvedValue({
        id: 1,
        jumlah_nasabah: 1,
        lob: 'KUR',
        nilai_beban_klaim: 10,
        penyebab_klaim: 'test',
        periode: new Date('2023-01-01')
      })

    const res = await request(app).post('/api/klaim');
    
    expect(res.statusCode).toBe(200);
  });

  it('should return 500 when fail fetch data', async () => {
    mockKlaim = jest.spyOn(klaimService, 'addKlaim')
      .mockRejectedValue('')

    const res = await request(app).post('/api/klaim');
    expect(res.statusCode).toBe(500);
  });
});

// sisanya mirip2 saja