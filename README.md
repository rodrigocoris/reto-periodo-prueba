# Periodo de Prueba – Desarrollo de Software

Este repositorio contiene la solución completa al **Reto de Periodo de Prueba – Desarrollo de Software** de Turing-IA.  
El proyecto implementa una aplicación **Full Stack** que parte de un wireframe y cumple con los requisitos descritos en el documento oficial del periodo de prueba:

- Pasar un **wireframe** a código usando **HTML/CSS/JS**.
- Crear una **página web temática** (en este caso, una **galería de items/artículos categorizados**).
- Desarrollar un **frontend** (React) que consume una **API propia**.
- Desarrollar un **backend** con API REST, CRUD, autenticación y base de datos.
- Documentar la solución, la base de datos y la forma de ejecutar el proyecto en entorno local.

---

## 1. Objetivo del reto

> “El reto consiste en pasar un wireframe a código demostrando tus habilidades con HTML y CSS, con JavaScript, la manipulación de objetos del DOM y el consumo de API’s. Además de crear un backend para hacer llamadas a una base de datos y mandar la información al frontend mediante endpoints. Cualquier añadido extra es un plus que se tomará en cuenta.”

En esta solución:

- El **frontend** está construido con **React + Vite**.
- El **backend** está construido con **Node.js + Express + SQLite**.
- La interfaz principal se llena dinámicamente mediante **llamadas a la API** propia.
- Se implementa un **panel de administración** con autenticación y roles (`admin`, `user`).

---

## 2. Stack tecnológico

**Frontend**

- React 18
- Vite 5
- CSS (Grid/Flexbox, custom properties, metodología ligera tipo BEM)
- Fetch API

**Backend**

- Node.js 18+
- Express 4.x
- SQLite3
- `bcryptjs` (hash de contraseñas)
- `jsonwebtoken` (JWT)
- `dotenv` (variables de entorno)

---

## 3. Estructura del repositorio

```text
reto-periodo-prueba/
├── backend/             # API REST (Node + Express + SQLite)
├── frontend/            # Aplicación React + Vite
├── PROYECTO-FINAL.md    # Documento interno de resumen del proyecto
└── README.md            # Este archivo
```

Cada carpeta (`backend`, `frontend`) incluye su propio `README.md` con más detalle técnico.

---

## 4. Requisitos previos

- Node.js 18 o superior
- npm
- (Opcional) Postman para probar la API
- (Opcional) Navegador moderno para ejecutar el frontend

---

## 5. Instrucciones de instalación y ejecución en local

### 5.1 Backend (API)

```bash
cd backend
npm install
npm run seed    # Crea las tablas e inserta datos de ejemplo (usuarios, categorías, items)
npm start       # Inicia el servidor en http://localhost:4000
```

Variables de entorno (archivo `.env`, basado en `.env.example`):

```env
PORT=4000
JWT_SECRET=un_secreto_seguro
```

### 5.2 Frontend (React)

En otra terminal:

```bash
cd frontend
npm install
npm run dev     # Inicia el frontend en http://localhost:5173
```

Por defecto, el frontend se conecta a `http://localhost:4000` vía:

```env
VITE_API_URL=http://localhost:4000
```

(Configurado en `.env` o usando el valor por defecto de `vite.config.js`).

### 5.3 Credenciales de prueba

- **Admin**: `admin` / `admin123`
- **User**: `user` / `user123`

---

## 6. Funcionalidades implementadas

### 6.1 Frontend (según PDF: “FUNCIONALIDADES BÁSICAS FRONTEND”)

- **Llenar un apartado mediante llamado a la API**  
  - La sección principal de la página es una **galería de items** que se llena desde el endpoint `GET /api/items`.

- **Cambio de elementos y carga de más elementos**  
  - El usuario puede:
    - Filtrar por **categoría** (botones en el sidebar, que disparan nuevas peticiones a la API).
    - Usar el botón **“Cargar más”** para paginar y añadir más elementos al listado.

- **Diseño responsive**  
  - La página se adapta a dispositivos de distintos tamaños (desktop, tablet, móvil) usando CSS Grid/Flexbox y media queries (breakpoint en 768px).

**Componentes principales**

- `App.jsx`: orquesta el estado global (usuario autenticado, tema, etc.).
- `Header.jsx`: cabecera, selección de tema y usuario autenticado.
- `Items.jsx`: galería de items con filtros y paginación, alimentada por la API.
- `Login.jsx`: formulario de autenticación.
- `AdminPanel.jsx`: panel de administración para CRUD de items (solo visible para `admin`).

---

### 6.2 Backend (según PDF: “FUNCIONALIDADES BÁSICAS BACKEND”)

- **CRUD completo**
  - `items`: `POST`, `GET`, `PUT`, `DELETE`.
  - `categories`: creación y listado.
  - `users`: creación y listado (solo admin).

- **Soporte de métodos HTTP**  
  - `GET`, `POST`, `PUT`, `DELETE` implementados en los endpoints correspondientes.

- **Login con dos tipos de usuarios**  
  - Usuarios con roles `admin` y `user`.
  - Login vía `POST /api/auth/login` que genera un **JWT**.

- **JWT (opcional en el PDF, implementado aquí)**
  - Se usa `jsonwebtoken` para firmar y verificar tokens.
  - Los endpoints protegidos requieren header `Authorization: Bearer <token>`.

---

## 7. Consideraciones frontend (PDF)

- **Buena legibilidad del código y división de responsabilidades**
  - La lógica está separada en componentes funcionales y archivos específicos.
- **Uso correcto de HTML/CSS**
  - Se usan etiquetas semánticas y un sistema de estilos basado en variables CSS.
- **Metodología CSS**
  - Se emplea una metodología ligera basada en:
    - **Custom properties** (`--bg`, `--card`, `--accent`, etc.).
    - Clases descriptivas y consistentes (estilo BEM básico).
- **Manejo del framework**
  - React Hooks (`useState`, `useEffect`) para gestionar estado, efectos y side effects (llamadas a la API).
- **Lógica de programación**
  - Manejo de estado, paginación, filtrado por categoría, login/logout y sincronización con `localStorage`.

---

## 8. Consideraciones backend (PDF)

- **Uso de middlewares**
  - `authMiddleware`: verifica el JWT y coloca el usuario en `req.user`.
  - `adminMiddleware`: asegura que el rol del usuario sea `admin` para acceder a rutas protegidas.

- **Documentación de endpoints**
  - Archivo `backend/API_DOCS.md` con el detalle de los endpoints.
  - Colección `backend/postman_collection.json` para probar la API con Postman.

- **Validación de datos**
  - Validaciones básicas en los endpoints (campos requeridos, existencia de categoría, etc.).

- **Temas de seguridad**
  - Hash de contraseñas con `bcryptjs`.
  - Uso de JWT para autenticación y protección de rutas.
  - Separación de credenciales sensibles mediante variables de entorno (`.env`).

- **División de responsabilidades**
  - `server.js`: definición de servidor Express y rutas.
  - `db.js`: conexión e inicialización de la base de datos.
  - `middleware.js`: middlewares de autenticación y autorización.
  - `seed.js`: script de siembra de datos iniciales.

---

## 9. Base de datos

La base de datos se implementa en **SQLite** y cumple con lo solicitado en el PDF:

- Al menos **3 tablas**.
- Esquema **normalizado** (mínimo 3FN).
- **Documentación del esquema**.

### 9.1 Tablas

- `users`
  - `id` (INTEGER, PK)
  - `username` (TEXT, UNIQUE)
  - `password` (TEXT, hash)
  - `role` (TEXT, por ejemplo `admin` o `user`)

- `categories`
  - `id` (INTEGER, PK)
  - `name` (TEXT, UNIQUE)

- `items`
  - `id` (INTEGER, PK)
  - `title` (TEXT)
  - `description` (TEXT)
  - `category_id` (INTEGER, FK → `categories.id`)
  - `image` (TEXT, URL opcional)

### 9.2 Relaciones

- Una **categoría** tiene **muchos items**.
- Un **item** pertenece a **una sola categoría**.
- Los **usuarios** se usan para autenticación y roles.

### 9.3 Diagrama ER

Diagrama ER (por ejemplo generado con dbdiagram.io):

```text
+-----------+          1        N     +---------+
| categories|------------------------<|  items  |
+-----------+                         +---------+
| id (PK)   |                         | id (PK) |
| name (UQ) |                         | title   |
+-----------+                         | description |
                                      | category_id (FK -> categories.id) |
                                      | image      |
                                      +------------+

+--------+
| users |
+--------+
| id (PK)     |
| username(UQ)|
| password    |
| role        |
+-------------+
```

---

## 10. Documentación técnica y artefactos adicionales

- **Endpoints de la API**  
  - Ver `backend/API_DOCS.md`.
  - Colección Postman: `backend/postman_collection.json`.

- **Diagramas de base de datos**  
  - Definidos en `db.js` y documentados arriba.
  - Diagrama visual generado con `dbdiagram.io`.

- **Video demostrativo**  
  - Se grabó un video corto mostrando:
    - Navegación por la página principal.
    - Filtros por categoría y paginación.
    - Login como `user` y `admin`.
    - Uso del panel admin (crear/editar/eliminar items).

---

## 11. Repositorio en GitHub y control de versiones

El proyecto está alojado en un repositorio público de GitHub:


Los commits están organizados de forma que reflejan el progreso durante los tres días de prueba (implementación de estructura inicial, lógica de backend, lógica de frontend, mejoras de UI, documentación, etc.).

---

## 12. Resumen del trabajo por días (breve)

- **Día 1**:  
  - Definición de la arquitectura (frontend/backend).
  - Configuración de proyectos React/Vite y Node/Express.
  - Diseño del esquema de base de datos y creación de tablas.

- **Día 2**:  
  - Implementación de la API REST (CRUD, login, roles, JWT).
  - Desarrollo de la galería en el frontend, consumo de la API, filtros y paginación.
  - Pruebas iniciales de integración frontend–backend.

- **Día 3**:  
  - Creación del panel de administración (CRUD desde frontend).
  - Afinado de estilos, temas y responsive.
  - Documentación (README, API_DOCS, diagrama de BD) y preparación para entrega.

---

## 13. Cumplimiento de requisitos del PDF

- ✅ Wireframe pasado a código con HTML/CSS/JS.
- ✅ Frontend con React (o framework equivalente).
- ✅ Sección de la página alimentada por API propia.
- ✅ Backend con API REST, CRUD, login, roles y (opcional) JWT implementado.
- ✅ Uso de middlewares, documentación de endpoints y consideraciones de seguridad.
- ✅ Base de datos con al menos 3 tablas normalizadas y esquema documentado.
- ✅ Documentación técnica: README, instrucciones de ejecución, detalles de dependencias y endpoints.
- ✅ Repositorio en GitHub con commits organizados.
- ✅ Video demostrativo del funcionamiento general del sistema.
