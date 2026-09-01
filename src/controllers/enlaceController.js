const TemaModel = require('../models/temaModel');

class EnlaceController {
  // Agregar enlace
  static async store(req, res) {
    try {
      const { temaId } = req.params;
      const { url, titulo } = req.body;
      
      if (!url || !titulo) {
        return res.status(400).json({ error: 'URL y título son obligatorios' });
      }
      
      const nuevoEnlace = await TemaModel.addEnlace(temaId, { url, titulo });
      if (!nuevoEnlace) {
        return res.status(404).json({ error: 'Tema no encontrado' });
      }
      
      res.status(201).json(nuevoEnlace);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Actualizar enlace
  static async update(req, res) {
    try {
      const { temaId, enlaceId } = req.params;
      const { url, titulo } = req.body;
      
      const enlaceActualizado = await TemaModel.updateEnlace(temaId, enlaceId, { url, titulo });
      if (!enlaceActualizado) {
        return res.status(404).json({ error: 'Tema o enlace no encontrado' });
      }
      
      res.json(enlaceActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar enlace
  static async delete(req, res) {
    try {
      const { temaId, enlaceId } = req.params;
      const eliminado = await TemaModel.deleteEnlace(temaId, enlaceId);
      
      if (!eliminado) {
        return res.status(404).json({ error: 'Tema o enlace no encontrado' });
      }
      
      res.json({ mensaje: 'Enlace eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Votar por enlace
  static async votar(req, res) {
    try {
      const { temaId, enlaceId } = req.params;
      const enlace = await TemaModel.votarEnlace(temaId, enlaceId);
      
      if (!enlace) {
        return res.status(404).json({ error: 'Tema o enlace no encontrado' });
      }
      
      res.json({ votos: enlace.votos, id: enlace.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EnlaceController;