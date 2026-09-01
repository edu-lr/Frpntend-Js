const express = require('express');
const router = express.Router();
const EnlaceController = require('../controllers/enlaceController');

// Todas las rutas usan :temaId para identificar el tema
router.post('/temas/:temaId/enlaces', EnlaceController.store);
router.put('/temas/:temaId/enlaces/:enlaceId', EnlaceController.update);
router.delete('/temas/:temaId/enlaces/:enlaceId', EnlaceController.delete);
router.post('/temas/:temaId/enlaces/:enlaceId/votar', EnlaceController.votar);

module.exports = router;