# Frontend - Reto Periodo de Prueba

React + Vite - Interfaz responsiva para consumir API

## Features
- ✓ Galería de items con paginación
- ✓ Filtro por categorías
- ✓ Login con JWT
- ✓ Panel admin para gestionar items (CRUD)
- ✓ Responsive design
- ✓ Componentes React reutilizables

## Tech Stack
- React 18
- Vite 5
- CSS Grid/Flexbox
- Fetch API

## Setup

```bash
npm install
npm run dev      # Inicia en http://localhost:5173
npm run build    # Build para producción
```

## Estructura del proyecto

```
frontend/
├── src/
│   ├── main.jsx           # Entry point
│   ├── App.jsx            # Componente principal
│   ├── styles.css         # Estilos globales
│   └── components/
│       ├── Header.jsx
│       ├── Items.jsx      # Galería con paginación
│       ├── Login.jsx      # Formulario login
│       └── AdminPanel.jsx # CRUD para admins
├── vite.config.js
├── index.html
└── package.json
```

## Uso

1. Abre `http://localhost:5173`
2. Login: admin / admin123 (para ver panel admin)
3. Navega por categorías
4. Usa "Cargar más" para paginación
5. Si eres admin, verás el panel para crear/editar/eliminar items

## Variables de entorno

`.env`:
```
VITE_API_URL=http://localhost:4000
```

(Por defecto apunta a `http://localhost:4000`)

## Componentes principales

- **Header**: Muestra usuario autenticado y botón de logout
- **Items**: Galería con filtro de categorías y paginación
- **Login**: Formulario para autenticarse
- **AdminPanel**: CRUD completo para items (solo admin)

## Estilos

Usando CSS custom properties y metodología BEM básica:
- `--bg`: Color de fondo
- `--card`: Color de tarjetas
- `--accent`: Color principal (azul)
- `--muted`: Gris para texto secundario
- `--danger`: Rojo para acciones peligrosas

Responsive: Breakpoint en 768px.

## Mejoras futuras

- [ ] Temas oscuro/claro
- [ ] Infinite scroll en lugar de "Cargar más"
- [ ] Búsqueda de items
- [ ] Comentarios en items
- [ ] Favoritos
- [ ] PWA capabilities