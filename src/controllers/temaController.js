// src/controllers/temaController.js
const TemaModel = require('../models/temaModel');

class TemaController {
    static async index(req, res) {
        try {
            const temas = await TemaModel.getAllTemas();
            temas.sort((a, b) => b.votos - a.votos);
            res.render('temas/index', { 
                temas,
                titulo: 'Lista de Temas'
            });
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    static async create(req, res) {
        res.render('temas/create', {
            titulo: 'Crear Nuevo Tema'
        });
    }

    static async store(req, res) {
        try {
            await TemaModel.createTema(req.body);
            res.redirect('/temas');
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    static async show(req, res) {
        try {
            const tema = await TemaModel.findTemaById(req.params.id);
            if (!tema) {
                return res.status(404).render('error', { 
                    error: { message: 'Tema no encontrado' }
                });
            }
            res.render('temas/show', { 
                tema,
                titulo: tema.titulo
            });
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    static async edit(req, res) {
        try {
            const tema = await TemaModel.findTemaById(req.params.id);
            if (!tema) {
                return res.status(404).render('error', { 
                    error: { message: 'Tema no encontrado' }
                });
            }
            res.render('temas/edit', { 
                tema,
                titulo: `Editar: ${tema.titulo}`
            });
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    static async update(req, res) {
        try {
            const tema = await TemaModel.updateTema(req.params.id, req.body);
            if (!tema) {
                return res.status(404).render('error', { 
                    error: { message: 'Tema no encontrado' }
                });
            }
            res.redirect(`/temas/${tema.id}`);
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    static async delete(req, res) {
        try {
            const eliminado = await TemaModel.deleteTema(req.params.id);
            if (!eliminado) {
                return res.status(404).render('error', { 
                    error: { message: 'Tema no encontrado' }
                });
            }
            res.redirect('/temas');
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    static async votar(req, res) {
        try {
            const tema = await TemaModel.votarTema(req.params.id);
            if (!tema) return res.status(404).json({ error: 'Tema no encontrado' });
            
            res.json({ 
                votos: tema.votos,
                id: tema.id
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TemaController;