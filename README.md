# ZenithSpace — blog sobre WiMAX

Blog futurista-espacial sobre **WiMAX (IEEE 802.16)**: historia, personajes, cobertura mundial, WiMAX en Bolivia y empresas bolivianas.

> Desarrollado por **Calle Cucho Josue Salomon** — Estudiante de Sistemas Informáticos, INCOS El Alto.

**📦 Descarga completa (zip):** [`zenithspace-wimax-blog-development.zip`](zenithspace-wimax-blog-development.zip)
· link directo: <https://github.com/zeyniyoimiya-art/zenithspace-wimax-blog-development/raw/main/zenithspace-wimax-blog-development.zip>

## ⚠️ Desviaciones respecto al pedido original (transparencia)

El entorno donde se construyó sirve un único `dist/index.html` generado con **React + Vite + Tailwind v4**, por lo que
**no fue posible usar SvelteKit**. Resumen de lo implementado y de lo que no:

| Requisito | Estado |
|---|---|
| SvelteKit | ❌ Implementado con React + Vite (restricción del entorno) |
| TypeScript strict + `noUncheckedIndexedAccess` | ✅ |
| Tailwind CSS v4 con tokens propios | ✅ |
| Three.js (globo 3D, shader GLSL de atmósfera, ondas de señal) | ✅ (WebGL) |
| WebGPU / TypeGPU / Threlte / drei | ❌ No integrados |
| GSAP / SplitText / Barba.js / Lottie / Motion | ❌ Sustituidos por CSS + IntersectionObserver + View Transitions API |
| CSS Houdini `paint()` | ❌ Campo de estrellas con CSS puro |
| Container Queries | ✅ (`@container` en tarjetas) |
| View Transitions API | ✅ |
| Web Audio (pad + BiquadFilter reactivo al scroll + mute) | ✅ |
| Cursor con estrellas, magnify y morph (Pointer Events) | ✅ |
| PWA (manifest + Service Worker offline) | ✅ (SW propio, sin Workbox) |
| Zod + formulario de contacto | ✅ (sin Superforms) |
| tRPC, TanStack Query | ❌ El contenido es estático tipado en `src/data` |
| Supabase (SQL, Edge Functions) | 📄 Código de referencia en `/supabase` (no conectado) |
| Rust → WASM | 📄 Código de referencia en `/wasm` (no compilado ni integrado) |
| `enhanced-img` AVIF/WebP | ❌ Imágenes del CDN de Pexels con compresión automática |
| Vitest + Playwright | 📄 Escritos en `/tests` (12 e2e); requieren instalar dependencias |
| Sentry / Plausible | ⚙️ Ver configuración abajo (no activados) |

## Contenido e investigación

Cada artículo cita sus fuentes (IEEE/NIST, WiMAX Forum, UIT, Entel, Airspan, Fundación Internet Bolivia, nPerf, etc.).
Donde no se halló evidencia pública (p. ej. WiMAX de Viva, Tigo o COMTECO; bloques exactos de espectro asignados por la ATT),
el sitio lo indica con la etiqueta **«No verificado»**. Tampoco se encontraron fuentes que vinculen a David J. Farber con
WiMAX ni una declaración verificable de Steve Jobs sobre WiMAX; el artículo *Personajes* lo explica.
Los artículos deben revisarse y ampliarse con documentos oficiales de la ATT antes de una publicación formal.

## Setup

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # genera dist/index.html (un solo archivo)
npm run preview   # sirve dist/ en http://localhost:4173
```

Tests (instalar antes `vitest` y `@playwright/test`):

```bash
npx vitest                 # unitarios
npx playwright test        # e2e (BASE_URL=http://localhost:4173)
```

Deploy: `vercel --prod` (usa `vercel.json`).

## Estructura

```
src/data/        Contenido tipado de los 5 artículos
src/components/  Globe (Three.js), StarCursor, AmbientSound, Layout, ArticleView...
src/pages/       Home, Cobertura, Personajes, Empresas, About, Contact
src/lib/         Router con View Transitions, hooks
public/          manifest, sw.js, icon, robots.txt, sitemap.xml, rss.xml
supabase/        Migración SQL + Edge Functions (contact, rss)
wasm/            Crate Rust (wasm-bindgen)
tests/           Vitest + Playwright
```

## Monitoring (opcional)

- **Plausible**: añade en `index.html` `<script defer data-domain="TU_DOMINIO" src="https://plausible.io/js/script.js"></script>`.
- **Sentry**: `npm i @sentry/react` y llama a `Sentry.init({ dsn: "TU_DSN" })` en `src/main.tsx`.

## Core Web Vitals

No se han medido con Lighthouse/PageSpeed en un entorno real, así que **no se publican puntuaciones**. Medidas de diseño para
alcanzar los objetivos (LCP < 2,5 s, CLS = 0, INP < 200 ms): imágenes con `width`/`height` y `aspect-ratio`, `fetchpriority="high"`
en la portada, `preconnect` a los CDN, texto como LCP, render 3D pausado fuera de pantalla, sin JS bloqueante de terceros.
Sugerencia: ejecutar `npx lighthouse <url>` tras el despliegue.

## Créditos

- Desarrollado por **Calle Cucho Josue Salomon**.
- Fotografías: Pexels (autor acreditado en cada imagen). Textura de la Tierra: [three-globe](https://github.com/vasturiano/three-globe).
