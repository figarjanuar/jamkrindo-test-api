// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import klaimRoutes from './routes/klaimRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use('/api/klaim', klaimRoutes);

const server = app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

export { app, server };