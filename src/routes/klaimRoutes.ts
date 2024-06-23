// src/routes/klaimRoutes.ts
import express from 'express';
import { addKlaim, getActivityLogs, getAllKlaim, getKlaimByLOB, sendKlaimToPenampungan } from '../controllers/klaimController';

const router = express.Router();

router.get('/', getAllKlaim);
router.get('/:lob', getKlaimByLOB);
router.post('/send-to-penampungan', sendKlaimToPenampungan);
router.post('/', addKlaim);
router.get('/log', getActivityLogs);

export default router;