// src/routes/temaRoutes.js
const express = require('express');
const router = express.Router();
const TemaController = require('../controllers/temaController');

// Lista de temas
router.get('/temas', TemaController.index);

// Formulario para crear tema
router.get('/temas/crear', TemaController.create);

// Crear tema
router.post('/temas', TemaController.store);

// Ver detalle de tema
router.get('/temas/:id', TemaController.show);

// Formulario para editar tema
router.get('/temas/:id/editar', TemaController.edit);

// Actualizar tema
router.put('/temas/:id', TemaController.update);

// Eliminar tema
router.delete('/temas/:id', TemaController.delete);

// Votar por tema
router.post('/temas/:id/votar', TemaController.votar);

module.exports = router;