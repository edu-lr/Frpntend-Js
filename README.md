# Aprendizaje App

Plataforma web para publicar **temas de aprendizaje**, agregarles **enlaces de recursos** (videos, artículos, etc.) y votar por los mejores. Todo se reordena automáticamente según los votos, tipo "ranking comunitario" de qué vale la pena aprender.

## Stack

- **Backend:** Node.js + Express 5
- **Vistas:** EJS + `express-ejs-layouts` (layout único en `layouts/main.ejs`)
- **Frontend:** JS vanilla (fetch API), sin frameworks
- **Persistencia:** archivo `data/temas.json` (sin base de datos)
- **Extras:** `method-override` (para PUT/DELETE desde formularios HTML)

## Funcionalidades

- CRUD completo de **temas** (crear, listar, ver, editar, eliminar)
- CRUD anidado de **enlaces** dentro de cada tema (agregar, editar, eliminar)
- Sistema de **votos** para temas y para enlaces, vía AJAX (sin recargar página)
- **Reordenamiento automático** en el cliente: lo más votado sube primero
- Página de error 404 personalizada
- Middleware de título dinámico por vista

## Estructura

```
server.js                    # entry point, config de Express y rutas
src/
  controllers/                # lógica (TemaController, EnlaceController)
  models/temaModel.js          # acceso a datos (lee/escribe temas.json)
  routes/                      # temaRoutes, enlaceRoutes
  views/                       # EJS: temas (index/show/create/edit), layout, partials
public/
  css/styles.css
  js/client.js                 # fetch + votar + reordenar (frontend)
data/temas.json               # "base de datos" en JSON
```

## Rutas principales

| Método | Ruta | Acción |
|---|---|---|
| GET | `/temas` | Listar temas (ordenados por votos) |
| GET | `/temas/crear` | Formulario nuevo tema |
| POST | `/temas` | Crear tema |
| GET | `/temas/:id` | Ver detalle + sus enlaces |
| GET/PUT | `/temas/:id/editar` `/temas/:id` | Editar tema |
| DELETE | `/temas/:id` | Eliminar tema |
| POST | `/temas/:id/votar` | Votar tema (AJAX) |
| POST/PUT/DELETE | `/temas/:temaId/enlaces/...` | CRUD de enlaces |
| POST | `/temas/:temaId/enlaces/:enlaceId/votar` | Votar enlace (AJAX) |

## Instalación y uso

```bash
npm install
npm run dev     # con nodemon
# o
npm start
```

Corre en `http://localhost:3000` (puerto configurable con `PORT`).

## Pendientes / mejoras posibles

- No hay autenticación (cualquiera puede votar/editar/borrar)
- No hay límite de un voto por usuario (se puede votar infinitas veces)
- Sin base de datos real ni tests
- Validación de datos mínima en backend

