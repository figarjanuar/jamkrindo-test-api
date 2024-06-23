import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const dbAplikasi = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_APP,
  connectionLimit: 10
});

export const dbPenampungan = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_PENAMPUNGAN,
  connectionLimit: 10
});