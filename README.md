# trabajo-practico-integrador-2

Sistema de Gestión de Blog Personal en Node.js con MongoDB y Mongoose.

## Tecnologías
- Node.js, Express (ESModules)
- MongoDB, Mongoose
- JWT (jsonwebtoken) + cookies httpOnly
- bcrypt para hashear contraseñas
- express-validator para validaciones

## Instalación rápida
1. Copiar el repositorio a tu máquina.
2. Copiar `.env.example` a `.env` y completar variables.
3. Ejecutar `npm init  `.
4.  Ejecutar `npm install`.
5. Ejecutar `npm run dev`.

## Estructura de carpetas
```
src/
├─ index.js
├─ config/db.js
├─ models/
│  ├─ User.js
│  ├─ Article.js
│  ├─ Tag.js
│  └─ Comment.js
├─ helpers/
│  ├─ jwt.js
│  └─ bcrypt.js
├─ middlewares/
│  ├─ auth.js
│  ├─ admin.js
│  └─ ownerOrAdmin.js
├─ controllers/
│  ├─ authController.js
│  ├─ usersController.js
│  ├─ tagsController.js
│  ├─ articlesController.js
│  └─ commentsController.js
└─ routes/
   ├─ auth.js
   ├─ users.js
   ├─ tags.js
   ├─ articles.js
   └─ comments.js
```

## Notas
- El código contiene comentarios en español explicando cada parte.
- `User.profile` está embebido por diseño (1:1).
- `Article`-`Tag` y `Article`-`Comment` son referencias (N:M y 1:N).
- Implementa soft-delete en `User` y cascada al eliminar `Article` y al eliminar `Tag` se remueve de `Article`.

Para más detalles y ejemplos de endpoints, revisá el código en `src/`.
