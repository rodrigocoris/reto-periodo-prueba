# Guía de despliegue: Backend (Render) + Frontend (Netlify)

Sigue estos pasos en orden. Necesitas cuenta en [GitHub](https://github.com), [Render](https://render.com) y [Netlify](https://netlify.com) (todas gratuitas).

---

## Parte 1: Subir el proyecto a GitHub

1. Crea un repositorio nuevo en GitHub (por ejemplo `reto-galeria-arte`). No marques "Add a README".
2. En tu carpeta del proyecto (donde están `frontend` y `backend`), abre PowerShell y ejecuta:

   ```powershell
   cd D:\Proyectos\reto-periodo-prueba
   git init
   git add .
   git commit -m "Proyecto listo para despliegue"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

---

## Parte 2: Desplegar el backend en Render

1. Entra en [render.com](https://render.com) e inicia sesión (puedes usar “Sign in with GitHub”).
2. Clic en **Dashboard** → **New** → **Web Service**.
3. Conecta tu cuenta de GitHub si te lo pide y selecciona el repositorio del proyecto.
4. Configura el servicio así:
   - **Name:** `galeria-arte-api` (o el que quieras).
   - **Region:** el más cercano a ti (por ejemplo Oregon o Frankfurt).
   - **Branch:** `main`.
   - **Root Directory:** `backend`  
     (importante: así Render usa solo la carpeta del backend).
   - **Runtime:** `Node`.
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. En **Environment** añade una variable:
   - **Key:** `JWT_SECRET`  
   - **Value:** una frase larga y aleatoria (por ejemplo: `miClaveSecretaParaJWT2025Galeria`)
6. Clic en **Create Web Service**. Render instalará dependencias y arrancará el servidor.
7. Cuando el deploy termine, verás algo como: **Your service is live at**  
   `https://galeria-arte-api.onrender.com`  
   Copia esa URL; es la **URL base de tu API**.
8. **Poblar la base de datos (solo la primera vez):**
   - En el panel del servicio, ve a **Shell** (pestaña o menú).
   - Se abre una terminal en el contenedor. Escribe:
     ```bash
     npm run seed
     ```
   - Pulsa Enter. Cuando termine, cierra el Shell.  
   A partir de ahí la API tendrá usuarios (`admin`/`admin123`) y las obras de ejemplo.

---

## Parte 3: Desplegar el frontend en Netlify

1. Entra en [netlify.com](https://netlify.com) e inicia sesión (por ejemplo con GitHub).
2. **Add new site** → **Import an existing project** → **Deploy with GitHub**.
3. Elige el mismo repositorio que usaste en Render.
4. Configura el sitio:
   - **Branch to deploy:** `main`
   - **Base directory:** `frontend`  
     (así Netlify solo usa la carpeta del frontend).
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`  
     (Vite genera la build en `dist`).
5. **Environment variables** (clic en “Add environment variables” o “New variable”):
   - **Key:** `VITE_API_URL`  
   - **Value:** la URL de tu API en Render **sin barra final**, por ejemplo:  
     `https://galeria-arte-api.onrender.com`
6. Guarda y haz **Deploy site**. Netlify instalará dependencias, hará `npm run build` y publicará la web.
7. Al terminar te dará una URL tipo:  
   `https://algo-random.netlify.app`  
   Puedes cambiarla en **Site settings** → **Domain management** → **Edit site name** (por ejemplo: `mi-galeria-arte.netlify.app`).

---

## Parte 4: Probar que todo funciona

1. Abre la URL de Netlify en el navegador.
2. Prueba:
   - Ver la galería y las categorías.
   - Iniciar sesión con `admin` / `admin123`.
   - Panel admin: crear, editar o borrar una obra.
   - Cerrar sesión y volver a entrar.
3. Si algo falla:
   - **Frontend no carga datos:** revisa que `VITE_API_URL` en Netlify sea exactamente la URL del backend en Render (con `https://`, sin `/` al final). Si la cambiaste, haz **Trigger deploy** → **Clear cache and deploy**.
   - **Backend no responde:** en Render, el plan gratis “duerme” el servicio tras ~15 min sin uso; la primera petición puede tardar 30–60 s. Revisa también la pestaña **Logs** del servicio por errores.

---

## Resumen de URLs

| Dónde        | URL ejemplo |
|-------------|-------------|
| API (Render)| `https://galeria-arte-api.onrender.com` |
| Web (Netlify)| `https://tu-sitio.netlify.app` |

El frontend en Netlify llama a la API en Render usando `VITE_API_URL`. Con eso tienes la misma funcionalidad que en local.

---

## Notas

- **Render (plan gratis):** el backend se duerme tras inactividad; la primera petición después de eso puede ser lenta (cold start).
- **SQLite en Render:** en el plan gratis el disco puede ser efímero. Si el servicio se reinicia, a veces se pierden datos; puedes volver a ejecutar `npm run seed` desde el Shell cuando haga falta.
- **CORS:** tu backend ya usa `cors()` sin restricción de origen, así que Netlify puede llamar a la API sin cambios extra.
