const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// CRUD routes
router.post('/clients', clientController.createClient);
router.get('/clients', clientController.getClients);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);
router.put('/clients/:id/suspend', clientController.suspendClient);

module.exports = router;
