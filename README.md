# Julieta Cozza — portfolio

Sitio armado en React + Vite, siguiendo el proceso que definimos: curaduría de
contenido → arquitectura → ficha por proyecto → dirección visual → esto.

## Cómo correrlo localmente (VS Code)

```bash
npm install
npm run dev
```

Abrí el link que te tira la terminal (por defecto `http://localhost:5173`).

## Estructura

```
src/
  data/categories.js     ← todo el contenido: categorías, proyectos, contacto
  components/
    CategoryWindow.jsx   ← tile de la home
    MiniMenu.jsx         ← menú de texto al expandir una categoría
    CategoryView.jsx     ← grid de thumbnails grandes dentro de una categoría
    PlaceholderImage.jsx ← muestra imagen real si existe, si no un placeholder
  App.jsx                ← arma todo junto (home / categoría expandida)
  styles.css              ← todos los estilos y variables de diseño
```

## TODO antes de publicar (pendientes tuyos)

Todo está marcado con `// TODO` o `{/* TODO */}` en el código, pero el resumen es:

1. **`src/data/categories.js`**
   - Reemplazar `image: null` por la ruta a cada imagen real (ej: `/img/demo-reel.jpg`,
     poniendo el archivo en la carpeta `public/img/`)
   - Completar títulos y años reales de las 4 bodas
   - Completar títulos y años reales de las 7 piezas de "Trabajo artístico"
     (ahí mismo dejé el nombre de cada una en `note` para que sepas cuál es cuál)
   - Completar las herramientas de IA que usás, en el `intro` de "Video & IA"
   - Tu WhatsApp real y email en `contact`
   - Subir tu CV en PDF a `public/` y confirmar el nombre del archivo en `contact.cvPdf`

2. **`src/styles.css`**
   - `--bg`: reemplazar por tu imagen/textura de fondo, o el color que definas
   - `--accent`: color de acento, todavía pendiente de tu lado

3. **Fuentes**: ya están linkeadas desde Google Fonts en `index.html`
   (Instrument Serif itálica + Space Mono). Si más adelante querés otras, se
   cambian ahí y en las variables `--font-display` / `--font-mono` de `styles.css`.

## Deploy gratis

Con Vercel (recomendado, deploy automático con cada push a git):

1. Subí este proyecto a un repo de GitHub
2. Entrá a vercel.com → "Add New Project" → importá el repo
3. Vercel detecta Vite automáticamente, no hace falta configurar nada
4. Te da un dominio gratis tipo `julieta-cozza.vercel.app`

Con Netlify es prácticamente igual (o incluso podés arrastrar la carpeta
`dist/` después de correr `npm run build`, sin usar git).

Dominio propio más adelante: se conecta desde el panel de Vercel/Netlify en
"Domains", sin tener que volver a tocar código.
