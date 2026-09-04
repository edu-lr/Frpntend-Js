const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para variables locales por defecto
app.use((req, res, next) => {
    res.locals.titulo = 'Aprendizaje App';
    next();
});

// Configurar layouts
app.use(expressLayouts);           
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.set('layout', 'layouts/main'); 

// Importar rutas
const temaRoutes = require('./src/routes/temaRoutes');
app.use(temaRoutes);


const enlaceRoutes = require('./src/routes/enlaceRoutes');
app.use(enlaceRoutes);


app.get('/', (req, res) => {
  res.redirect('/temas');
});

app.use((req, res) => {
  res.status(404).render('error', { error: { message: 'Página no encontrada' } });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});