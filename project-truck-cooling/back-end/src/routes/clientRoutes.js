import express from 'express';
import { createClient, getClients, updateClient, detailClients, deleteClient, suspendClient, restoreClient } from '../controllers/clientController.js';

const router = express.Router();

//routes client
router.post('/clients', createClient);
router.get('/clients', getClients);
router.get('/clients/:id', detailClients);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);
router.put('/clients/:id/suspend', suspendClient);
router.put('/clients/:id/restore', restoreClient);

export default router;