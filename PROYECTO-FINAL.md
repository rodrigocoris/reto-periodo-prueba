# Reto - Periodo de Prueba - Full Stack

Implementación completa de un reto de desarrollo con React + Express + SQLite

**Fecha:** 4 de marzo de 2026  
**Estado:** MVP funcional con panel admin

## 📁 Estructura

```
reto-periodo-prueba/
├── backend/          # API REST en Node.js + Express + SQLite
│   ├── server.js
│   ├── db.js
│   ├── middleware.js
│   ├── seed.js
│   ├── README.md
│   ├── API_DOCS.md
│   ├── postman_collection.json
│   └── package.json
├── frontend/         # Interfaz en React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── styles.css
│   ├── README.md
│   ├── package.json
│   └── vite.config.js
├── TIMELINE.md       # Avance por días
└── README.md         # Este archivo
```

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
npm run seed    # Pobla la BD con datos de ejemplo
npm start       # Escucha en http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev      # Abre http://localhost:5173
```

**Credenciales:**
- Admin: `admin` / `admin123`
- User: `user` / `user123`

## ✨ Features Implementadas

### Frontend
- ✓ Galería de items con paginación ("Cargar más")
- ✓ Filtro por categorías
- ✓ Login con JWT
- ✓ Panel admin con CRUD de items
- ✓ Responsive design (mobile-first)
- ✓ Componentes React reutilizables

### Backend
- ✓ Autenticación con JWT
- ✓ Roles de usuario (admin/user)
- ✓ CRUD completo protegido
- ✓ Paginación de items
- ✓ Validaciones
- ✓ SQLite con BD normalizada (3NF)

## 📊 Base de Datos

Tres tablas normalizadas:

```sql
users (id, username, password, role)
categories (id, name)
items (id, title, description, category_id, image)
-- Foreign key: items.category_id → categories.id
```

## 📚 Documentación

- **[Backend README](backend/README.md)** - Setup, endpoints, estructura
- **[Frontend README](frontend/README.md)** - Componentes, estilos, variables
- **[API Docs](backend/API_DOCS.md)** - Detalle de endpoints
- **[Postman Collection](backend/postman_collection.json)** - Importar en Postman

## 🎯 Avance por Días

### Día 1 (4 de marzo)
- [x] Estructura base (frontend + backend)
- [x] BD con SQLite (3 tablas)
- [x] Express API con CRUD
- [x] React con galería y paginación
- [x] Login con JWT
- [x] Panel admin básico

### Día 2 (5 de marzo)
- [ ] Validaciones avanzadas
- [ ] Tests unitarios (Jest)
- [ ] Mejoras UI
- [ ] Documentación Postman

### Día 3 (6 de marzo)
- [ ] Despliegue (Vercel/Heroku)  
- [ ] Video demostrativo
- [ ] Commits finales a GitHub

## 🛠️ Stack Tecnológico

**Backend:**
- Node.js 18+
- Express 4.x
- SQLite3
- bcryptjs
- jsonwebtoken

**Frontend:**
- React 18
- Vite 5
- CSS Grid/Flexbox
- Fetch API

## 📋 Requisitos Cumplidos

- ✓ Wireframe → HTML/CSS/JavaScript
- ✓ Consumo de API con manipulación de DOM
- ✓ Backend con endpoints CRUD
- ✓ Login con dos tipos de usuario
- ✓ JWT implementado
- ✓ Página responsiva
- ✓ Código legible y bien organizado
- ✓ Uso de metodologías CSS (BEM básico)
- ✓ Validación de datos
- ✓ Documentación técnica

## 🎁 Extras Implementados

- ✓ Panel admin completo con CRUD visual
- ✓ Colección Postman
- ✓ Paginación con límite configurable
- ✓ Filtro por categorías
- ✓ Middleware de autenticación
- ✓ Roles RBAC

## 🔗 Links

- API: http://localhost:4000
- Frontend: http://localhost:5173
- Postman: Importar `backend/postman_collection.json`

## 📝 Notas

El proyecto está listo para pruebas locales. Para producción:
1. Configurar variables de entorno (.env)
2. Usar HTTPS
3. Añadir rate limiting
4. Implementar refresh tokens
5. Aumentar coverage de tests

---

**Última actualización:** 4 de marzo de 2026