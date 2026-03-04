# Periodo de Prueba - Desarrollo de Software

Este repositorio contiene la solución al reto planteado en el periodo de prueba de
un proceso de selección. La propuesta cumple con las especificaciones detalladas
en el documento entregado, que se resume a continuación:

- Se entrega una página web a partir de un wireframe cualquiera de los dos
  propuestos.
- El tema de la web es libre; en este caso se eligió una galería de artículos
  categorizados.
- El frontend se construye con React y Vite, aunque se podrían usar otras
  tecnologías.
- Al menos una sección de la página se llena mediante consulta a una API
  desarrollada ad‑hoc.
- La API se implementa con Express en Node.js y expone endpoints para CRUD,
  paginación y autenticación.

**Requisitos funcionales front‑end**

- Cargar una sección de la web a través de llamadas a la API.
- Mediante JavaScript permitir cambiar la categoría mostrada y cargar más
  elementos.
- La página es responsive, adaptándose a móviles y tablets.

**Requisitos funcionales back‑end**

- CRUD completo para los recursos manejados (categorías, items, usuarios).
- Soporte de métodos POST, GET, PUT y DELETE.
- Autenticación con dos tipos de usuario: `admin` y `user`.
- Uso de middleware para proteger rutas y validar datos.

**Consideraciones generales**

- El código está dividido en responsabilidades claras y usa etiquetas HTML
  semánticas.
- El frontend sigue una metodología CSS ligera (propiedades custom y clases
  BEM-like).
- Se documentaron los endpoints en un archivo `API_DOCS.md` y en una
  colección Postman.
- La base de datos SQLite consta de tres tablas normalizadas (3NF) y se
  incluye un script de populación inicial.
- Se ha preparado documentación técnica y comandos para ejecutar el proyecto
  en local.

## Estructura del repositorio

```
reto-periodo-prueba/
├── backend/          # API REST
├── frontend/         # Aplicación React
├── PROYECTO-FINAL.md # Resumen del proyecto
└── README.md         # Este archivo
```

## Inicio rápido

1. **Backend**
   ```bash
   cd backend
   npm install
   npm run seed    # crea tablas y datos de ejemplo
   npm start       # servidor en http://localhost:4000
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev     # app en http://localhost:5173
   ```

3. Abrir la dirección en el navegador e interactuar.

## Credenciales de prueba

- Admin: `admin` / `admin123`
- User: `user` / `user123`

## Funcionalidades implementadas

- Listado paginado de items obtenido por API.
- Filtro de categorías y botón “Cargar más”.
- Autenticación JWT con roles. Usuarios admin pueden crear/editar/borrar
  items desde un panel.
- API REST con endpoints protegidos, paginación, validación básica.
- Base de datos SQLite con tres tablas normalizadas.

## Documentación adicional

- Ver `backend/API_DOCS.md` para detalles de cada endpoint.
- Importar `backend/postman_collection.json` en Postman.
