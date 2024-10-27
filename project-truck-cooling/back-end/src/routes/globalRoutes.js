import express from 'express';
import {getKelolaAlat} from '../controllers/kelolaalatController.js';
import { getKelolaKomoditas } from '../controllers/KelolaKomoditasController.js';

const router = express.Router();

//kelolaalat Client
router.get('/kelolaalatcl', getKelolaAlat);
router.get('/kelolakomoditas', getKelolaKomoditas);

export default router;
