# Reto - Periodo de Prueba

Full-stack implementation: React + Express + SQLite

## Estructura
- `backend/` — API en Node.js + Express + SQLite
- `frontend/` — React + Vite

## Setup rápido

**Backend:**
```bash
cd backend
npm install
npm run seed
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Credenciales de prueba:**
- admin / admin123
- user / user123

## Features implementadas

✓ Frontend React con llamadas a API REST
✓ Filtro por categorías 
✓ Paginación y "Cargar más"
✓ Login con JWT
✓ CRUD backend con protección de roles (admin/user)
✓ SQLite con 3 tablas normalizadas (users, categories, items)
✓ Middlewares de autenticación
✓ Responsive design

## Próximos pasos disponibles

- Documentación en Postman
- Tests unitarios (Jest)
- Despliegue en Vercel/Heroku
- Video demostrativo
- Formularios para crear/editar items (admin only)

Dime qué quieres que haga a continuación.