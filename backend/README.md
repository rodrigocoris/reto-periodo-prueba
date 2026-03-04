# Backend - Reto Periodo de Prueba

API REST en Node.js + Express + SQLite

## Features
- ✓ Autenticación con JWT
- ✓ Roles de usuario (admin/user)
- ✓ CRUD completo de items
- ✓ Paginación
- ✓ Validaciones básicas
- ✓ SQLite con 3 tablas normalizadas

## Tech Stack
- Node.js 18+
- Express.js 4.x
- SQLite3
- bcryptjs (hash de contraseñas)
- jsonwebtoken (JWT)

## Setup

```bash
npm install
npm run seed    # Crea tablas e inserta datos de ejemplo
npm start       # Inicia servidor en puerto 4000
```

## Credenciales de prueba
- admin / admin123
- user / user123

## Estructura de la BD

**users** (id, username, password, role)
**categories** (id, name)
**items** (id, title, description, category_id, image)

## Endpoints

Ver `API_DOCS.md` o importar `postman_collection.json` en Postman.

### Public
- `GET /api/categories` - Listado de categorías
- `GET /api/items?page=1&limit=6` - Items paginados (filtrable por categoría)

### Auth
- `POST /api/auth/login` - Login

### Admin only
- `POST /api/users` - Crear usuario
- `GET /api/users` - Listar usuarios
- `POST /api/items` - Crear item
- `PUT /api/items/:id` - Actualizar item
- `DELETE /api/items/:id` - Eliminar item
- `POST /api/categories` - Crear categoría

## Estructura del proyecto

```
backend/
├── server.js          # Servidor Express y rutas
├── db.js              # Inicialización de BD
├── middleware.js      # Auth y admin middleware
├── seed.js            # Script para popular BD
├── package.json
├── .env.example
├── API_DOCS.md
└── postman_collection.json
```

## Errores comunes

- `Cannot find module`: Ejecuta `npm install`
- `SQLITE_CANTOPEN`: Asegúrate de tener permisos de escritura en la carpeta
- Token inválido: Verifica que el header sea `Authorization: Bearer {token}`

## Siguientes mejoras

- [ ] Tests unitarios con Jest
- [ ] Rate limiting
- [ ] Validación de email
- [ ] Refresh tokens
- [ ] Logs structured