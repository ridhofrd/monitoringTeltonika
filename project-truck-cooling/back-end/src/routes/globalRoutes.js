import express from 'express';
import {getKelolaAlat} from '../controllers/kelolaalatController.js';

const router = express.Router();

//Routerdisini
router.get('/kelolaalatcl', getKelolaAlat);

export default router;
