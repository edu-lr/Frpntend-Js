const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../data/temas.json');

class TemaModel {
  // Leer todos los temas
  static async getAllTemas() {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data).temas;
  }

  // Guardar todos los temas
  static async saveTemas(temas) {
    await fs.writeFile(DATA_PATH, JSON.stringify({ temas }, null, 2));
  }

  // Encontrar tema por ID
  static async findTemaById(id) {
    const temas = await this.getAllTemas();
    return temas.find(tema => tema.id === parseInt(id));
  }

  // Crear nuevo tema
  static async createTema(temaData) {
    const temas = await this.getAllTemas();
    const nuevoTema = {
      id: temas.length > 0 ? Math.max(...temas.map(t => t.id)) + 1 : 1,
      titulo: temaData.titulo,
      descripcion: temaData.descripcion,
      votos: 0,
      enlaces: []
    };
    temas.push(nuevoTema);
    await this.saveTemas(temas);
    return nuevoTema;
  }

  // Actualizar tema
  static async updateTema(id, temaData) {
    const temas = await this.getAllTemas();
    const index = temas.findIndex(tema => tema.id === parseInt(id));
    if (index === -1) return null;
    
    temas[index] = {
      ...temas[index],
      titulo: temaData.titulo || temas[index].titulo,
      descripcion: temaData.descripcion || temas[index].descripcion
    };
    
    await this.saveTemas(temas);
    return temas[index];
  }

  // Eliminar tema
  static async deleteTema(id) {
    const temas = await this.getAllTemas();
    const temasFiltrados = temas.filter(tema => tema.id !== parseInt(id));
    await this.saveTemas(temasFiltrados);
    return temas.length !== temasFiltrados.length;
  }

  // Votar por tema
  static async votarTema(id) {
    const temas = await this.getAllTemas();
    const tema = temas.find(t => t.id === parseInt(id));
    if (!tema) return null;
    
    tema.votos += 1;
    await this.saveTemas(temas);
    return tema;
  }


// ============ MÉTODOS PARA ENLACES ============

// Obtener todos los enlaces de un tema
  static async getEnlacesByTema(temaId) {
    const temas = await this.getAllTemas();
    const tema = temas.find(t => t.id === parseInt(temaId));
    return tema ? tema.enlaces || [] : null;
  }

  // Agregar un enlace a un tema
  static async addEnlace(temaId, enlaceData) {
    const temas = await this.getAllTemas();
    const tema = temas.find(t => t.id === parseInt(temaId));
    if (!tema) return null;
    
    const nuevoEnlace = {
      id: tema.enlaces.length > 0 ? Math.max(...tema.enlaces.map(e => e.id)) + 1 : 1,
      url: enlaceData.url,
      titulo: enlaceData.titulo,
      votos: 0
    };
    
    tema.enlaces.push(nuevoEnlace);
    await this.saveTemas(temas);
    return nuevoEnlace;
  }

  // Actualizar un enlace de un tema
  static async updateEnlace(temaId, enlaceId, enlaceData) {
    const temas = await this.getAllTemas();
    const tema = temas.find(t => t.id === parseInt(temaId));
    if (!tema) return null;
    
    const enlace = tema.enlaces.find(e => e.id === parseInt(enlaceId));
    if (!enlace) return null;
    
    enlace.url = enlaceData.url || enlace.url;
    enlace.titulo = enlaceData.titulo || enlace.titulo;
    
    await this.saveTemas(temas);
    return enlace;
  }

  // Eliminar un enlace de un tema
  static async deleteEnlace(temaId, enlaceId) {
    const temas = await this.getAllTemas();
    const tema = temas.find(t => t.id === parseInt(temaId));
    if (!tema) return null;
    
    const enlacesFiltrados = tema.enlaces.filter(e => e.id !== parseInt(enlaceId));
    if (enlacesFiltrados.length === tema.enlaces.length) return false;
    
    tema.enlaces = enlacesFiltrados;
    await this.saveTemas(temas);
    return true;
  }

  // Votar por un enlace
  static async votarEnlace(temaId, enlaceId) {
    const temas = await this.getAllTemas();
    const tema = temas.find(t => t.id === parseInt(temaId));
    if (!tema) return null;
    
    const enlace = tema.enlaces.find(e => e.id === parseInt(enlaceId));
    if (!enlace) return null;
    
    enlace.votos += 1;
    await this.saveTemas(temas);
    return enlace;
  }
}


module.exports = TemaModel;