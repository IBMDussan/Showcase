# Bootstrap · Showcase BackOffice CashApps

> **Cómo usar este archivo con Bob**
> 1. Completa la tabla de variables.
> 2. Guárdalo en el repo vacío como `docs/bob/00-bootstrap-prompt.md`.
> 3. En **Plan mode** escribe: `Lee @docs/bob/00-bootstrap-prompt.md y ejecuta la Fase 0.`
> 4. Aprueba el plan, cambia a **Agent mode** y ejecuta una fase por conversación.

## Variables

| Variable | Valor |
|---|---|
| `PERIODO` | `Q? 2026` |
| `AREA` | `BackOffice CashApps` |
| `REPO` | `<org>/<repo>` |
| `LEAD` | `@<usuario-github>` — dueño del core |
| Responsables | columna "Owner" de la tabla §9.0 (usa `TBD` si aún no se asigna) |

---

## 1. Rol

Eres un arquitecto front-end y diseñador de producto senior. Dominas React + TypeScript, sistemas de diseño, visualización de datos y motion design sobrio. En esta tarea construyes **la base compartida (core)** de una presentación web modular que un equipo completará en paralelo vía GitHub, y dejas **configurado a Bob** (`AGENTS.md`, skill, modo y reglas) para que cada integrante produzca su parte con el mismo flujo, estilo y calidad.

Trabajas por fases, te detienes al final de cada una y no inventas datos: si falta un número, usas los mocks de §13 o dejas un `TODO` que la validación detecte.

## 2. Contexto

- **Qué es.** El showcase del periodo del área `AREA` para su gerente: métricas operativas, cobertura del modelo de respaldo, desempeño, retrospectiva e iniciativas. Reemplaza una presentación lineal hecha en Figma Make.
- **Nueva estructura.** Una portada editorial tipo revista (**hub**) con tarjetas de distinto tamaño y tipo. Cada tarjeta abre su **sección**; cada sección es una secuencia vertical de **slides** que se recorre con teclado o scroll. Algunas secciones tienen **drill-down** (tarjeta → lista → detalle).
- **Referencia visual del hub.** Collage editorial: tarjetas flotantes con leve superposición y profundidad, titulares serif grandes sobre imagen, paneles de interfaz translúcidos (un campo tipo buscador, un panel de chips). Al hacer clic, la tarjeta se transforma en el encabezado de su sección.
- **Tono visual.** Sobrio y editorial, inspirado en la estética de Anthropic: neutros cálidos, un único acento terracota, serif elegante para titulares, sans limpia para texto, mucho aire, líneas finas y motion contenido. Es una referencia de tono: no uses su logo, nombre ni fuentes propietarias.
- **Uso.** Se proyecta en 16:9 (1920×1080 y 1440×900) y se comparte como enlace. Debe verse impecable desde 1280 px y ser legible en móvil.
- **Equipo.** Cada integrante es dueño de una sección y la sube por PR. **Nadie debe editar archivos compartidos para que su sección aparezca.**
- **Idioma.** UI y contenido en español (es-CO). Código, archivos, ramas y commits en inglés.

## 3. Entregables

- **A. Punto de convergencia (core).** App con hub, shell de sección, navegación de presentación, sistema de diseño, componentes y gráficas compartidas, registro automático de secciones, validación y CI/CD. Incluye las 8 secciones sembradas como borrador con datos mock.
- **B. Skill `showcase-section`** en `.bob/skills/showcase-section/` con referencias de soporte, más un modo `section-builder` y reglas de proyecto.
- **C. `AGENTS.md` en la raíz**: especificación técnica viva que Bob carga automáticamente en cada conversación cuando alguien clona o hace pull.

## 4. Stack y restricciones

| Área | Decisión |
|---|---|
| Build | Vite + React + TypeScript `strict` (versiones estables actuales) · Node LTS fijado en `.nvmrc` · npm |
| Estilos | Tailwind CSS v4 con tokens en CSS (`@theme`) + variables CSS para claro/oscuro |
| Rutas | React Router con **hash router** (compatible con GitHub Pages, sin 404 al recargar) |
| Motion | `motion` (`motion/react`) + View Transitions API para hub → sección |
| Gráficas | `recharts` para barras, líneas y combos; SVG propio con `d3-scale`/`d3-shape` para heatmap, matriz, bullet y vectores |
| Datos | `zod` para esquemas de `meta` y `content` |
| Iconos | `lucide-react`, trazo 1.5 |
| Fuentes | Self-hosted con Fontsource: `@fontsource-variable/source-serif-4`, `@fontsource-variable/inter`, `@fontsource/ibm-plex-mono`. Sin CDN: debe funcionar sin internet al presentar |
| Calidad | ESLint + Prettier + Vitest |
| CI/CD | GitHub Actions: `check` en cada PR; deploy a GitHub Pages desde `main`. Si Pages no está habilitado en la organización, publicar `dist` como artefacto descargable |

Las secciones **no pueden agregar dependencias**. Cualquier dependencia nueva entra por PR al core.

---

## 5. Arquitectura — el punto de convergencia

### 5.1 Árbol de carpetas

```
.
├── AGENTS.md                        # especificación técnica (Bob la carga siempre)
├── README.md                        # quickstart para humanos
├── .bobignore
├── .bob/
│   ├── custom_modes.yaml            # modo section-builder
│   ├── rules/01-showcase.md         # reglas de proyecto (todos los modos)
│   ├── rules-section-builder/01-scope.md
│   └── skills/showcase-section/
│       ├── SKILL.md
│       ├── checklist.md
│       └── references/
│           ├── content-schemas.md
│           ├── components.md
│           ├── design-tokens.md
│           ├── motion.md
│           ├── image-slots.md
│           └── copy-style.md
├── .github/
│   ├── CODEOWNERS
│   ├── pull_request_template.md
│   └── workflows/ (ci.yml, deploy.yml)
├── scripts/
│   ├── new-section.mjs              # npm run new:section -- <slug> "<Título>"
│   └── check-scope.mjs              # npm run check:scope
├── src/
│   ├── main.tsx
│   ├── app/                         # router, registry, providers, hub, shell, índice ⌘K
│   │   ├── hub.config.ts            # textos del masthead (dueño: LEAD)
│   │   └── assets/logo.svg          # logo corporativo que aporta el equipo
│   ├── core/
│   │   ├── theme/tokens.css         # ÚNICA fuente de valores de diseño
│   │   ├── components/              # layout y contenido
│   │   ├── charts/
│   │   ├── motion/
│   │   ├── media/                   # ImageSlot, VideoSlot, ScreenFrame
│   │   ├── vectors/                 # Glyph, Connector, Grain, GridLines
│   │   ├── schemas/                 # zod: meta, content, bloques
│   │   └── lib/                     # format.ts, thresholds.ts, people.ts, stats.ts
│   ├── dev/kit/                     # #/_kit: galería de componentes (solo dev)
│   └── sections/
│       ├── _template/
│       ├── objetivos/
│       ├── indicadores/
│       ├── respaldo/
│       ├── mm-performance/
│       ├── cargue-horas/
│       ├── desempeno/
│       ├── retrospectiva/
│       └── iniciativas/
└── docs/bob/00-bootstrap-prompt.md  # este archivo
```

### 5.2 Contrato de una sección

```
src/sections/<slug>/
├── meta.ts       # export default defineSectionMeta({...})   → alimenta el hub
├── content.ts    # export default defineContent(schema, {...}) → datos, textos, imágenes
├── index.tsx     # export default function Section()          → compone <Slide>s
├── slides/       # un archivo por slide (recomendado con 3+ slides)
└── assets/       # imágenes y videos propios
```

- `slug` en kebab-case ASCII e idéntico al nombre de la carpeta. Las carpetas que empiezan con `_` se ignoran.
- `order` en múltiplos de 10; lo usan el hub y la navegación ←/→.
- `index.tsx` solo usa componentes de `@/core/*`. Puede tener componentes locales de composición (el layout de su slide) que usen tokens; **nunca** gráficas propias ni colores, fuentes o duraciones literales.
- Los cálculos (promedios, tendencias, umbrales, variaciones) viven en `@/core/lib`, no en los slides.
- `meta.ts` importa de `./content` para derivar la portada sin duplicar cifras:

```ts
import { defineSectionMeta } from '@/core/schemas'
import { mean } from '@/core/lib/stats'
import content from './content'

export default defineSectionMeta({
  slug: 'indicadores',
  order: 20,
  eyebrow: 'Resultados operativos',
  title: 'Evidencias e indicadores',
  summary: 'Cumplimiento por actividad y volumen mensual del periodo.', // ≤ 140 caracteres
  owner: '@usuario',
  status: 'draft',        // 'draft' | 'ready' — draft solo se ve en dev o con ?drafts
  glyph: 'circle',        // marca vectorial de la sección (§6.6)
  cover: {
    variant: 'stat',      // 'feature' | 'stat' | 'chart' | 'list' | 'type'
    size: 'md',           // 'sm' (3 col) | 'md' (4 col) | 'lg' (6 col × 2 filas)
    value: mean(content.activities.map((a) => a.value)),
    format: 'percent',
    label: 'Promedio general',
  },
})
```

`cover` es una unión discriminada por `variant`:
`feature { image: ImageSlot, title? }` · `stat { value, format, label, delta? }` · `chart { kind: 'sparkline' | 'bars' | 'matrix', values }` · `list { items: string[] (≤ 3) }` · `type { display: string (≤ 4 caracteres, p. ej. "Q3") }`.

### 5.3 Registro automático (cero conflictos de merge)

```ts
// src/app/registry.ts
const metas = import.meta.glob(['../sections/*/meta.ts', '!../sections/_*/meta.ts'], {
  eager: true,
  import: 'default',
})
const loaders = import.meta.glob(['../sections/*/index.tsx', '!../sections/_*/index.tsx'])
```

- Valida cada `meta` con zod; `slug` debe coincidir con la carpeta; `slug` y `order` únicos.
- Cada sección se carga con `React.lazy` dentro de su propio `Suspense` + `ErrorBoundary`: **una sección rota nunca rompe el hub ni las demás**. En dev, la tarjeta muestra el error; en prod, la sección se oculta (el CI ya lo habría bloqueado).
- Agregar una sección = crear su carpeta. Nadie edita archivos compartidos.

### 5.4 Rutas y modo presentación

| Ruta | Vista |
|---|---|
| `#/` | Hub |
| `#/s/:slug` | Sección (slide activo sincronizado en `?slide=n` con `replaceState`) |
| `#/s/:slug/*` | Subrutas propias de la sección (drill-down de `iniciativas`) |
| `#/_kit` | Galería de componentes (solo dev) |

| Tecla | Acción |
|---|---|
| `→` / `←` | Siguiente / anterior sección por `order` (en el hub, `→` abre la primera) |
| `↓` `↑` `Space` `PageDown` `PageUp` | Siguiente / anterior slide |
| `Esc` | Retrocede un nivel: detalle → lista → sección → hub |
| `1`–`9` | En el hub, abre la sección N |
| `/` o `⌘K` / `Ctrl+K` | Paleta de índice |
| `F` · `T` | Pantalla completa · alternar tema |

Las teclas se desactivan mientras el foco está en un campo de texto. Parámetro `?anon=1`: `core/lib/people.ts` reemplaza nombres de personas por iniciales en toda la app (para compartir el enlace más ampliamente).

### 5.5 Hub editorial

- **Masthead.** Marca textual `AREA` + espacio para el logo corporativo como asset (`src/app/assets/logo.svg`, lo aporta el equipo; no lo dibujes) · "Showcase · `PERIODO`" · titular en serif display y bajada, ambos editables en `hub.config.ts` (por defecto: "Resultados, avances e iniciativas").
- **Grilla.** 12 columnas, `grid-auto-flow: dense`, tamaños según `cover.size`, ritmo asimétrico. En ≥ 1440 px las tarjetas `lg` pueden desplazarse −16 a −24 px en Y para el efecto collage, sin tapar áreas clicables.
- **Variantes de tarjeta** (cuál usa cada sección está en §9):
  - `feature`: imagen a sangre + titular serif sobre scrim cálido.
  - `stat`: cifra grande en serif con conteo animado + etiqueta + micro-barra.
  - `chart`: mini-gráfica derivada de los datos de la sección (sparkline, barras o mini-matriz).
  - `list`: hasta 3 líneas de avance con marcador vectorial.
  - `type`: composición tipográfica (display corto + glyph).
- **Común a todas:** folio de revista (01–08) en mono, eyebrow, título serif, glyph de la sección, "Ver sección →" que aparece en hover y focus, etiqueta "Borrador" si `status: 'draft'` (solo dev).
- **Fragmentos flotantes.** (1) **Índice**: botón con aspecto de campo de búsqueda translúcido, "Ir a una sección… ⌘K", que abre la paleta (funcional, eco del buscador de la referencia). (2) Líneas vectoriales finas y grano sutil de fondo. No agregues paneles decorativos sin función.
- **Pie.** Fecha de actualización (build time) y, solo en dev, conteo de secciones listas vs borrador.

### 5.6 Shell de sección

- **Header:** eyebrow `EYEBROW · PERIODO`, título serif, `summary`, owner discreto. Comparte `view-transition-name` con la tarjeta del hub.
- **Slides:** `min-height: 100svh`, `scroll-snap-type: y proximity`, padding por tokens; cada `<Slide>` con `id` y título accesible.
- **Progreso:** puntos verticales a la derecha (clicables, tooltip con el título del slide) + barra fina superior.
- **Pie:** "← Sección anterior · Índice · Siguiente sección →".
- **Impresión:** `@media print` con un slide por página 16:9 para exportar PDF desde el navegador.

### 5.7 Validación, aislamiento y CI

- **`npm run validate`** se implementa como test de Vitest (así las importaciones de assets funcionan) que recorre todas las secciones y verifica: esquema de `meta` y `content`; `slug` = carpeta; `order` único; toda `ImageSlot` con `alt`, `ratio` y `brief`; longitudes (`title` ≤ 60, `summary` ≤ 140 caracteres); una sección `ready` no puede tener `TODO` ni imágenes pendientes (en `draft` solo generan advertencia).
- **`npm run check:scope`**: en ramas `section/<slug>`, falla si el diff contra `origin/main` toca algo fuera de `src/sections/<slug>/`.
- **`npm run check`** = typecheck + lint + validate + test + build.
- **CI** (`ci.yml`, en cada PR): `npm ci`, `check`, `check:scope` (checkout con `fetch-depth: 0`). **Deploy** (`deploy.yml`): en push a `main`.

---

## 6. Sistema de diseño

### 6.1 Principios

Editorial antes que dashboard. Una idea por slide. Mucho aire. Un solo acento por pantalla. Los datos se leen sin leyenda. El movimiento explica, no decora.

### 6.2 Tipografía

| Token | Fuente | Tamaño / interlínea | Uso |
|---|---|---|---|
| `--text-display` | Source Serif 4, 400, `-0.02em` | `clamp(3.25rem, 2rem + 4.5vw, 6rem)` / 1.02 | Titular del hub, numeral del periodo |
| `--text-h1` | Source Serif 4, 400 | `clamp(2.25rem, 1.5rem + 2.5vw, 3.75rem)` / 1.08 | Título de sección |
| `--text-h2` | Source Serif 4, 500 | `clamp(1.5rem, 1.2rem + 1vw, 2rem)` / 1.2 | Título de slide |
| `--text-h3` | Inter, 600 | 1.25rem / 1.3 | Títulos de tarjeta |
| `--text-body` | Inter, 400 | 1.0625rem / 1.6 | Texto |
| `--text-small` | Inter, 400 | 0.875rem / 1.5 | Notas, pies |
| `--text-eyebrow` | IBM Plex Mono, 500, mayúsculas, `0.14em` | 0.75rem / 1 | Eyebrows, folios |
| `--text-kpi` | Source Serif 4, 400, `lining-nums tabular-nums` | `clamp(2.5rem, 1.8rem + 2.2vw, 4rem)` | Cifras grandes |
| `--text-data` | IBM Plex Mono, 400, `tabular-nums` | 0.8125rem | Ejes, tablas, tooltips |

Títulos en *sentence case* ("Objetivos de la iteración", no "Objetivos De La Iteración").

### 6.3 Color

Tema con `data-theme="light|dark"` sobre `<html>`, valor inicial desde `prefers-color-scheme`, toggle persistente y sin flash al cargar.

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#FAF9F5` | `#1A1916` | Fondo |
| `--surface` | `#FFFFFF` | `#22211E` | Tarjetas |
| `--surface-2` | `#F0EEE6` | `#2B2A26` | Paneles, hover, placeholders |
| `--ink` | `#141413` | `#F0EEE6` | Texto principal |
| `--ink-2` | `#3D3D3A` | `#CFCCC2` | Texto secundario |
| `--muted` | `#73726C` | `#9C9A92` | Etiquetas, ejes |
| `--line` | `#E3E0D6` | `#3A3833` | Bordes, grillas |
| `--accent` | `#D97757` | `#E08B6D` | Acento terracota: superficies y elementos grandes, **no** texto pequeño |
| `--accent-strong` | `#B5563A` | `#EBA389` | Texto y links con acento (cumple AA) |
| `--focus` | `#D97757` | `#E08B6D` | Anillo de foco 2 px con offset 2 px |

**Paleta de datos** (categórica, orden fijo; en oscuro subir ~10 % de luminosidad): `--data-1 #D97757` (clay) · `--data-2 #6A9BCC` (sky) · `--data-3 #788C5D` (olive) · `--data-4 #D4A27F` (kraft) · `--data-5 #8B86B8` (heather) · `--data-6 #5E5D59` (slate).

**Estados por umbral** (`core/lib/thresholds.ts`, valores iniciales que confirma el LEAD). Siempre color + etiqueta o icono, nunca solo color:

| Estado | Regla | Color | Fondo tenue |
|---|---|---|---|
| Perfecto | = 100 % | `#5E7A45` | `#E7EDDF` |
| Excelente | ≥ 95 % | `#3F6F9E` | `#E2EBF4` |
| Óptimo | ≥ 90 % | `#A8741F` | `#F4EAD8` |
| Requiere atención | < 90 % | `#A5432A` | `#F6E2DA` |

**Rampa secuencial para heatmaps** (5 pasos). Claro: `#F7EFE6 → #EFD3BF → #E3A98A → #CC7654 → #9C4A2E`. Oscuro: `#2A2521 → #4A3328 → #7A4631 → #B25E3F → #E08B6D`. El color del texto de cada celda se elige por luminancia.

### 6.4 Visualización de datos

- Etiquetas directas en lugar de leyendas siempre que se pueda.
- Un acento para destacar el dato protagonista; el resto en neutros. La paleta categórica solo cuando hay categorías reales.
- Ejes en `--text-data` color `--muted`, sin línea de eje Y, grilla horizontal hairline.
- Barras con radio 3 px en el extremo y valor al final; líneas de 2 px con puntos de 4 px y anillo `--surface`.
- Tooltips: tarjeta `--surface`, borde hairline, cifras en mono.
- Cada gráfica es un `<figure>` con `<figcaption>`, `aria-label` con el resumen y tabla `sr-only` con los datos.
- Todos los números pasan por `core/lib/format.ts` con `Intl` `es-CO`: `97,4 %`, `3.448`, rating `4,20`, meses cortos (`ene`, `feb`) desde `YYYY-MM`.

### 6.5 Forma, espacio y profundidad

- Base 4 px. Padding de slide: bloque `clamp(48px, 8vh, 120px)`, línea `clamp(20px, 6vw, 112px)`. Ancho máximo de contenido 1320 px.
- Radios: `--r-sm 6px` · `--r-md 12px` (tarjetas) · `--r-lg 20px` (paneles flotantes) · chips `999px`.
- Sombras cálidas y suaves: `--shadow-1: 0 1px 2px rgb(20 20 19 / .05)` · `--shadow-2: 0 1px 2px rgb(20 20 19 / .04), 0 12px 32px -16px rgb(20 20 19 / .18)`. En oscuro, profundidad con bordes y un highlight interior sutil en lugar de sombras.
- Translucidez solo en fragmentos flotantes del hub: `backdrop-filter: blur(8px)` como máximo.

### 6.6 Vectores e iconografía

- `Glyph`: set de 8 marcas de contorno, trazo 1.5 px, relleno opcional del acento al 12 %: `square`, `circle`, `triangle`, `diamond`, `ring`, `arc`, `hexagon`, `bars`. Se dibujan al entrar (`pathLength`).
- `Connector`: curvas punteadas finas que unen elementos relacionados (p. ej., objetivos → secciones).
- `GridLines` (grilla editorial al 4 % en el hub) y `Grain` (ruido SVG `feTurbulence` al 3–4 %).
- `ScreenFrame`: ventana vectorial minimalista que enmarca capturas de pantalla.
- Iconos `lucide-react`, 20 px, trazo 1.5, color `--ink-2`. Sin emojis en la UI.

---

## 7. Motion

**Tokens:** `--ease-out: cubic-bezier(.22, 1, .36, 1)` · `--ease-in-out: cubic-bezier(.65, 0, .35, 1)` · duraciones `--dur-1 150ms`, `--dur-2 300ms`, `--dur-3 600ms`, `--dur-count 900ms` · stagger 50–70 ms · desplazamiento de entrada 12–16 px. Primitivas en `core/motion`: `Reveal`, `Stagger`, `CountUp`, `DrawPath`, `Parallax`, `usePresentationKeys`.

| Momento | Comportamiento |
|---|---|
| Carga del hub | Masthead en fade (300 ms), tarjetas en stagger desde `y: 16`, líneas vectoriales se dibujan (900 ms) |
| Hover / focus de tarjeta | `translateY(-2px)`, `--shadow-2`, imagen a `scale(1.02)` en 600 ms, flecha avanza 4 px |
| Puntero en el hub | Parallax ±6 px en fragmentos, ±2 px en tarjetas; desactivado en touch |
| Hub → sección | View Transition de 450 ms: la tarjeta se transforma en el header; el resto en crossfade. Sin soporte: fade |
| Slide visible (35 %) | Header aparece, luego contenido en stagger. Una sola vez |
| Gráficas | Barras crecen desde la base (600 ms, stagger 40 ms), líneas se dibujan (800 ms), celdas de heatmap de `.96` a `1` en diagonal (20 ms), `CountUp` 900 ms |
| Drill-down | `layoutId`: la tarjeta se expande a la vista de lista; el panel de detalle entra desde la derecha (32 px + fade, 300 ms) con fondo al 40 % |
| Cambio de tema | Crossfade de colores 200 ms |
| `prefers-reduced-motion` | Sin transformaciones, parallax ni dibujado: solo opacidad 150 ms; `CountUp` muestra el valor final |

Sin loops infinitos, rebotes, efectos de tipeo, carruseles automáticos ni confeti.

---

## 8. Imágenes complementarias (`ImageSlot`)

Bob no genera imágenes: deja **placeholders especificados** que el equipo reemplaza.

```ts
type ImageSlot = {
  id: string
  src?: string                      // import desde ./assets; vacío mientras no exista
  alt: string                       // obligatorio: describe lo que se ve
  ratio: '16:9' | '16:10' | '3:2' | '4:3' | '1:1'
  brief: string                     // qué debe mostrar la imagen (guía para quien la produzca)
  caption?: string
  frame?: 'none' | 'screen'         // 'screen' = captura dentro de ScreenFrame
  sensitive?: boolean               // true = recordar difuminar nombres, montos, cuentas
  fit?: 'cover' | 'contain'
}
```

| Situación | Render |
|---|---|
| Dev, sin `src` | Placeholder: marco con la proporción, borde hairline discontinuo, trama diagonal sutil, icono, "IMAGEN PENDIENTE · 16:10" en mono y el texto de `brief` |
| Prod, sin `src` | Fallback vectorial generativo (glyph de la sección + trazos + tinte del acento). Nunca el placeholder ni un hueco |
| Con `src` | Lazy loading, `decoding="async"`, fade-in, `object-position` opcional |

Reglas: WebP o AVIF, ≤ 400 KB, ancho máximo 2400 px; capturas siempre dentro de `ScreenFrame`; sin datos personales ni financieros legibles; fotos de personas solo con consentimiento; nada de stock genérico ni imágenes generadas que simulen capturas reales. `VideoSlot` (opcional): mp4/webm ≤ 15 s, sin audio, `muted` y reproducción solo cuando es visible.

---

## 9. Mapa de contenido por sección

**Regla general:** todo número, tabla o tendencia se dibuja con **código** desde `content.ts`. Las **imágenes** solo aportan evidencia visual (capturas, fotos) y nunca contienen datos que deberían ser gráficas.

### 9.0 Resumen

| # | `slug` | Título | Glyph | Portada en el hub | Owner |
|---|---|---|---|---|---|
| 01 | `objetivos` | Objetivos de la iteración | `ring` | `type` · lg (numeral del periodo) | TBD |
| 02 | `indicadores` | Evidencias e indicadores | `circle` | `stat` · md (promedio general) | TBD |
| 03 | `respaldo` | Modelo de respaldo | `square` | `chart` · md (mini-matriz) | TBD |
| 04 | `mm-performance` | MM Performance & Metrics | `arc` | `chart` · sm (mini-barras) | TBD |
| 05 | `cargue-horas` | Cargue de horas: SAP vs TIME | `hexagon` | `stat` · sm (total + tendencia) | TBD |
| 06 | `desempeno` | Métricas de desempeño | `bars` | `type` · sm | TBD |
| 07 | `retrospectiva` | Retrospectiva | `triangle` | `list` · md (1 línea por columna) | TBD |
| 08 | `iniciativas` | Iniciativas | `diamond` | `feature` · lg (imagen) | TBD |

### 9.1 `objetivos` — Objetivos de la iteración

| Slide | Bloque | Tipo | Componente / especificación | Campos de `content` |
|---|---|---|---|---|
| 1 | Portada de la iteración | Código | `PeriodHero`: numeral del periodo en `--text-display` ("Q3") con línea que se dibuja + resumen ejecutivo | `period`, `summary` (≤ 40 palabras) |
| 2 | Objetivos | Código | 4 × `ObjectiveCard` con `Glyph` (cuadrado, círculo, triángulo, rombo), `StatusChip` y enlace a la sección relacionada; `Connector` sutil entre tarjetas | `objectives[]: { id, title, description, glyph, status: 'logrado' \| 'en-curso' \| 'pendiente', link?: slug }` |

Imágenes: ninguna.

### 9.2 `indicadores` — Evidencias e indicadores

| Slide | Bloque | Tipo | Componente / especificación | Campos de `content` |
|---|---|---|---|---|
| 1 | KPIs del periodo | Código | `StatStrip` de 4 `StatCard`: promedio general, indicadores en 100 % (x/n), indicadores ≥ 99 % (x/n), menor cumplimiento (actividad + %). **Derivados** de `activities`, nunca escritos a mano | `activities[]: { key, label, value }` (0–100) |
| 2 | Cumplimiento por actividad | Código | `ProgressList`: barra horizontal por actividad, `StatusChip` por umbral, valor al final, orden descendente | `activities` |
| 3 | Volumen por actividad y mes | Código | `Heatmap` actividad × mes con escala por fila (por defecto) y conmutador fila/global; valor en celda; tooltip con variación vs mes anterior | `volume: { months: string[], rows: { label, values: number[] }[] }` |
| Todos | Hallazgos | Código | `Insight` al pie del slide | `insights?: string[]` (≤ 2, ≤ 25 palabras c/u) |

Imágenes: ninguna.

### 9.3 `respaldo` — Modelo de respaldo

| Slide | Bloque | Tipo | Componente / especificación | Campos de `content` |
|---|---|---|---|---|
| 1 | Cobertura general | Código | `StatCard` (promedio general) + `BarList` del promedio por actividad con línea de meta | derivados de `values`; `target?: number` |
| 2 | Matriz responsable × actividad | Código | `CoverageMatrix`: filas = personas, columnas = actividades (icono lucide + etiqueta), celda con barra o anillo proporcional + color por umbral, promedios por fila y columna, resaltado de fila/columna en hover | `activities[]: { key, label, icon }`, `people[]: { id, name }`, `values: Record<personId, Record<activityKey, number>>` |
| 3 (opcional) | Evolución | Código | `Delta` por actividad vs periodo anterior | `previous?: Record<activityKey, number>` |

Imágenes: ninguna. Datos por persona: respeta `?anon=1`.

### 9.4 `mm-performance` — MM Performance & Metrics

| Slide | Bloque | Tipo | Componente / especificación | Campos de `content` |
|---|---|---|---|---|
| 1 | KPIs | Código | `StatStrip` de 5: Avg rating (2 decimales), # of submissions, MM part % (5 X's), MM part % (2 X's), Current active squads | `kpis[]: { key, label, value, format }` |
| 2 | Submissions y rating | Código | `ComboChart`: barras = submissions (eje izquierdo), línea = avg rating (eje derecho, dominio 0–5), etiquetas directas | `monthly[]: { month: 'YYYY-MM', submissions, avgRating }` |
| 2 (opcional) | Evidencia | Imagen | `ImageSlot` 16:9, `frame: 'screen'`. **Brief:** captura del tablero de MM filtrado por el periodo, sin nombres visibles. **Alt:** "Tablero de MM filtrado por `PERIODO`" | `evidence?: ImageSlot` |

### 9.5 `cargue-horas` — Cargue de horas: SAP vs TIME

| Slide | Bloque | Tipo | Componente / especificación | Campos de `content` |
|---|---|---|---|---|
| 1 | Tendencia | Código | `StatPanel` (total de personas con diferencia en el periodo + etiqueta de tendencia **calculada**: disminución, aumento o estable) + `BarLineTrend` por mes + `SequenceChips` (2 › 1 › 1 › 0) + `Insight` con el % de cambio **calculado** entre primer y último mes | `monthly[]: { month, people }` |
| 1 | Contexto del cruce | Código (vector) | `SourceCompare`: nodos "SAP" y "TIME" unidos por un conector que se dibuja | — |

Imágenes: ninguna.

### 9.6 `desempeno` — Métricas de desempeño

| Slide | Bloque | Tipo | Componente / especificación | Campos de `content` |
|---|---|---|---|---|
| 1 | Tabla por consultor | Código | `DataTable`: columnas tipadas (`percent` \| `status` \| `number`), micro-barra en columnas %, umbral por columna con color + icono, orden por columna, encabezado fijo | `columns[]: { key, label, type, target? }`, `rows[]: { person, values: Record<key, number \| string> }` |
| 2 | Equipo vs meta | Código | `BulletChart` por métrica (promedio del equipo vs meta) | derivado de `rows` + `target` |

Columnas iniciales: Current year goal, CV up-to-date, JRS & Skills, Timely claim, Hours accuracy, Your learning. Imágenes: ninguna. Datos por persona: respeta `?anon=1`.

### 9.7 `retrospectiva` — Retrospectiva

| Slide | Bloque | Tipo | Componente / especificación | Campos de `content` |
|---|---|---|---|---|
| 1 | Tablero | Código | `RetroBoard` de 3 columnas: ¿Qué salió bien? (`--data-3`), ¿Qué necesita cambio? (`--data-4`), Nuevas ideas (`--data-2`); marcador vectorial por columna; ítems en stagger | `columns: { wentWell: string[], toChange: string[], ideas: string[] }` |
| 2 (opcional) | Acciones acordadas | Código | `ActionList` (acción, responsable, fecha, estado) | `actions?: { text, owner, due, status }[]` |
| 1 (opcional) | Evidencia | Imagen | `ImageSlot` 3:2. **Brief:** foto del tablero de la retro o del equipo en la sesión (con consentimiento). **Alt:** descriptivo de la escena | `photo?: ImageSlot` |

### 9.8 `iniciativas` — Iniciativas (drill-down en 3 niveles)

| Nivel | Bloque | Tipo | Componente / especificación | Campos de `content` |
|---|---|---|---|---|
| Hub | Portada | Imagen | `ImageSlot` 16:10 en tarjeta `feature`. **Brief:** composición de capturas de las iniciativas (asistente virtual respondiendo + macro en ejecución), datos difuminados. **Alt:** "Asistente virtual y macro de automatización en uso". Fallback vectorial en prod | `cover: ImageSlot` |
| N1 | Iniciativas | Código | `InitiativeGrid` de `InitiativeCard`: icono lucide en recuadro, título, resumen, `StatusChip` (Activo · En progreso · Planeado), métrica titular opcional ("5 macros activas") | `initiatives[]: { id, title, summary, status, icon, headline?: { value, label }, items[] }` |
| N2 | Elementos | Código | Clic → la tarjeta se expande (`layoutId`) a una vista con barra "← Volver a iniciativas", eyebrow y título, y una grilla de `ItemCard`: título, `TagChip` con check, línea de tecnología, "Ver detalles →" | `items[]: { id, title, tag, tech, summary, detail }` |
| N3 | Detalle | Código + Imagen | `DetailPanel` (lateral de 560–720 px; vista completa bajo 1024 px): Problema → Solución → Impacto. `ImpactStats` (horas ahorradas/mes, volumen procesado, % reducción de errores), `BeforeAfter` (tiempo manual vs automatizado), `FlowSteps` (diagrama vectorial de 3–6 pasos), `Timeline` de hitos, chips de tecnología. `ImageSlot` 16:10 con `frame: 'screen'` y `sensitive: true`. **Brief:** captura de la macro, robot o asistente en ejecución con datos difuminados. `VideoSlot` opcional con la demo | `detail: { problem, solution, impact: Kpi[], before?, after?, steps?: string[], milestones?: { date, label, done }[], tech: string[], images?: ImageSlot[], video? }` |

URLs profundas: `#/s/iniciativas/<initiativeId>/<itemId>`. `Esc` retrocede un nivel.

---

## 10. Catálogo de componentes del core

Cada componente: tipado, accesible, en claro/oscuro, con reduced motion, documentado en `references/components.md` y visible en `#/_kit` con datos mock.

| Grupo | Componentes |
|---|---|
| Layout | `SectionShell`, `Slide`, `SlideHeader` (eyebrow, título, lead), `Eyebrow`, `Insight`, `Grid` |
| KPIs | `StatCard`, `StatStrip`, `StatPanel`, `Delta`, `SequenceChips` |
| Gráficas | `ProgressList`, `BarList`, `Heatmap`, `CoverageMatrix`, `DataTable`, `BulletChart`, `ComboChart`, `BarLineTrend`, `Sparkline`, `BeforeAfter` |
| Contenido | `PeriodHero`, `ObjectiveCard`, `RetroBoard`, `ActionList`, `FlowSteps`, `Timeline`, `StatusChip`, `TagChip`, `SourceCompare` |
| Drill-down | `InitiativeGrid`, `InitiativeCard`, `ItemCard`, `DetailPanel`, `ImpactStats` |
| Media | `ImageSlot`, `VideoSlot`, `ScreenFrame` |
| Motion | `Reveal`, `Stagger`, `CountUp`, `DrawPath`, `Parallax` |
| Vectores | `Glyph`, `Connector`, `GridLines`, `Grain` |
| Hub | `Masthead`, `HubGrid`, `CoverCard` (5 variantes), `IndexPalette` |

`components.md` incluye una tabla de decisión "quiero mostrar X → usa Y" (p. ej., "comparar % contra meta por categoría → `ProgressList`"; "dos métricas con escalas distintas en el tiempo → `ComboChart`").

---

## 11. Configuración de Bob para el equipo

### 11.1 `AGENTS.md` (raíz)

Especificación técnica viva. Bob la carga en cada conversación, así que debe ser concreta, verificada contra el código real y de ≤ 400 líneas. Los valores de diseño viven solo en `tokens.css`; aquí van nombres y reglas de uso. Arriba, "Última actualización: <fecha>". Secciones obligatorias:

1. Propósito y audiencia (≤ 5 líneas).
2. Comandos: `dev`, `build`, `check`, `validate`, `test`, `new:section`, `check:scope`.
3. Mapa del repo.
4. Arquitectura y contrato de sección, con un ejemplo mínimo de `meta.ts`, `content.ts` e `index.tsx`.
5. Propiedad: qué puede tocar un dueño de sección y qué es del `LEAD`.
6. Sistema de diseño resumido (tokens por nombre, tipografías, paleta de datos, umbrales) con enlaces a `references/`.
7. Motion resumido.
8. Imágenes (`ImageSlot`) resumido.
9. Mapa de contenido (tabla §9.0 con columna de estado).
10. Flujo Git y PR.
11. Definition of Done de una sección.
12. Cómo trabajar con Bob aquí: usar el modo `section-builder` e invocar `/showcase-section`; **no ejecutar `/init`** (reescribe este archivo con un escaneo automático; si alguien lo ejecuta, revisar el diff antes de commitear); mantener activo `bob-code.useAgentRules`.
13. Qué NO hacer (§16).

### 11.2 Skill `showcase-section`

`.bob/skills/showcase-section/SKILL.md`, con este frontmatter exacto:

```yaml
---
name: showcase-section
description: Crea, completa, actualiza o revisa una sección del showcase BackOffice CashApps dentro de src/sections/<slug>/ (slides, datos, gráficas, imágenes y portada del hub), siguiendo el sistema de diseño, los esquemas de contenido y el flujo de PR del equipo.
user-invocable: true
---
```

Cuerpo en pasos accionables:

1. Identificar `slug` y dueño; si no se conocen, preguntar. Confirmar la rama `section/<slug>`; si no existe, crearla desde `main` actualizado (`git pull --rebase origin main`).
2. Si la carpeta no existe: `npm run new:section -- <slug> "<Título>"`.
3. Leer `references/content-schemas.md` y `references/components.md`; según la tarea, `design-tokens.md`, `motion.md`, `image-slots.md` y `copy-style.md`.
4. Pedir al usuario los datos reales que falten (tabla, CSV o texto). **Nunca inventar cifras**: si faltan, `TODO` y `status: 'draft'`.
5. Mapear cada bloque a un componente con la tabla de decisión. Si ninguno sirve, detenerse y redactar la propuesta para el `LEAD` (issue `core:` con props y mock), sin crear gráficas locales.
6. Escribir `content.ts` → `index.tsx` / `slides/` → portada en `meta.ts`.
7. Imágenes: `ImageSlot` con `alt`, `ratio` y `brief`; archivos en `assets/`.
8. Verificar: `npm run check` y `npm run check:scope`; revisar en `npm run dev` claro/oscuro, 1280/1440/1920 px, reduced motion y teclado.
9. Recorrer `checklist.md`, commit convencional `feat(<slug>): …`, push y PR con la plantilla.

Mantén `SKILL.md` enfocado en el flujo (≤ 120 líneas); el detalle va en los archivos de soporte:

| Archivo | Contenido |
|---|---|
| `references/content-schemas.md` | Cada esquema de bloque con ejemplo, alineado con `core/schemas` |
| `references/components.md` | Catálogo, props, tabla de decisión, do/don't, ruta en `#/_kit` |
| `references/design-tokens.md` | Nombres de tokens y cuándo usar cada uno (sin valores) |
| `references/motion.md` | Qué primitiva usar en cada caso, tokens de duración, reduced motion |
| `references/image-slots.md` | §8 completo, con ejemplos de `brief` y `alt` bien escritos |
| `references/copy-style.md` | Títulos en sentence case ≤ 6 palabras; eyebrow `CATEGORÍA · PERIODO`; lead ≤ 30 palabras; insights que empiezan por la cifra o el verbo, ≤ 25 palabras; sin exclamaciones ni emojis; nombres de métricas corporativas en su idioma original (MM, Timely claim) |
| `checklist.md` | Definition of Done de una sección (§15.2) |

### 11.3 Modo `section-builder` (`.bob/custom_modes.yaml`)

```yaml
customModes:
  - slug: section-builder
    name: Section Builder
    description: Construye y actualiza una sección del showcase.
    roleDefinition: >-
      Eres un desarrollador front-end del equipo BackOffice CashApps. Construyes
      secciones del showcase usando exclusivamente el core compartido, con criterio
      editorial y de visualización de datos.
    whenToUse: Úsalo para crear o editar slides, datos, gráficas, imágenes o la portada de una sección en src/sections/<slug>/.
    customInstructions: |-
      Al iniciar cada tarea, carga la skill showcase-section.
      Solo modificas archivos dentro de src/sections/<slug>/ de la sección asignada.
      Si necesitas cambiar src/core, src/app, .bob o .github, detente y redacta la propuesta para el LEAD.
    groups:
      - read
      - - edit
        - fileRegex: "^src/sections/[a-z0-9-]+/.+"
          description: Solo carpetas de secciones (excluye _template)
      - execute
      - skill
      - todo
```

Verifica que el modo cargue en el selector de modos (un `fileRegex` inválido impide que el archivo cargue).

### 11.4 Reglas

- `.bob/rules/01-showcase.md` (todos los modos, ≤ 25 líneas): leer `AGENTS.md` antes de cambios estructurales · UI en es-CO y código en inglés · nada de colores, fuentes, tamaños o duraciones literales fuera de `tokens.css` · no agregar dependencias sin pedido explícito del `LEAD` · no inventar datos · `npm run check` antes de cada commit · al terminar, resumir archivos cambiados.
- `.bob/rules-section-builder/01-scope.md`: alcance del modo y qué hacer si algo del core falla (reportar con pasos de reproducción, no parchear).

### 11.5 `.bobignore`

`node_modules/`, `dist/`, `coverage/`, `*.log`, `src/sections/*/assets/*.mp4`, `src/sections/*/assets/*.webm`.

---

## 12. Flujo Git del equipo

- `main` protegida: PR obligatorio, CI verde y 1 aprobación (CODEOWNERS).
- Ramas: `section/<slug>` para dueños de sección, `core/<tema>` para el `LEAD`.
- Commits convencionales: `feat(indicadores): …`, `fix(core): …`, `chore(bob): …`.
- Un PR de sección solo toca `src/sections/<slug>/**` (lo verifica `check:scope`).
- Antes de abrir PR: `git pull --rebase origin main`.
- `CODEOWNERS`: `/src/core/`, `/src/app/`, `/src/dev/`, `/.bob/`, `/.github/`, `/scripts/`, `/AGENTS.md`, `/package.json` → `LEAD`; cada `/src/sections/<slug>/` → su owner.
- Plantilla de PR: qué cambia, capturas en claro y oscuro, checklist DoD, quién verificó los datos, confirmación de imágenes sin datos sensibles.
- El repositorio debe ser **privado o interno**: contiene métricas por persona.

---

## 13. Datos mock para sembrar las secciones

Datos del periodo anterior, solo como mock (`status: 'draft'`). Las personas van anonimizadas.

```ts
// indicadores
activities: [
  { key: 'traspasos', label: 'Traspasos', value: 100 },
  { key: 'depuraciones', label: 'Depuraciones', value: 100 },
  { key: 'cheques-devueltos', label: 'Cheques devueltos', value: 99 },
  { key: 'cadenas-productivas', label: 'Cadenas productivas', value: 98 },
  { key: 'rastreos', label: 'Rastreos', value: 93 },
], // → promedio 98 %, 2/5 en 100 %, 3/5 ≥ 99 %, menor: Rastreos 93 %
volume: {
  months: ['2026-01', '2026-02', '2026-03', '2026-04'],
  rows: [
    { label: 'Rastreos', values: [3448, 3655, 3731, 4098] },
    { label: 'Procesos Promexma', values: [1403, 1402, 1642, 1463] },
    { label: 'Conciliaciones bancarias', values: [1123, 1089, 1524, 1179] },
    { label: 'Cadenas productivas', values: [30, 37, 48, 46] },
    { label: 'Ingresos backoffice', values: [17, 17, 26, 34] },
    { label: 'Traspasos intercompañías', values: [15, 21, 14, 9] },
  ],
}

// respaldo — columnas: rastreos, promexma, conciliaciones, cadenas, ingresos, traspasos
// Analista A..F → [100,20,0,0,0,50] [100,0,0,0,0,0] [50,100,0,0,0,0]
//                 [100,100,100,80,80,80] [50,100,0,100,100,0] [100,100,80,30,100,100]
// → promedios por actividad 83 · 70 · 30 · 35 · 47 · 38; general 51 %

// mm-performance
kpis: avgRating 4.20 · submissions 269 · mmPart5x 58.5 · mmPart2x 146.2 · activeSquads 1
monthly: [
  { month: '2026-01', submissions: 60, avgRating: 4.07 },
  { month: '2026-02', submissions: 76, avgRating: 4.12 },
  { month: '2026-03', submissions: 72, avgRating: 4.33 },
  { month: '2026-04', submissions: 61, avgRating: 4.26 },
]

// cargue-horas
monthly: [
  { month: '2026-01', people: 2 }, { month: '2026-02', people: 1 },
  { month: '2026-03', people: 1 }, { month: '2026-04', people: 0 },
] // → total 4, disminución del 100 %

// desempeno — columnas: currentYearGoal %, cvUpToDate %, jrsSkills (status), timelyClaim %, hoursAccuracy %, yourLearning (número)
// Consultor A → 97.4, 100, 'Met', 100, 100, 7.5
// Consultor B → 97.2, 100, 'Met', 100, 100, 13
// Consultor C → 97.2, 100, 'Met', 100, 89, 28
// Consultor D → 97.6,  88, 'Met', 100, 58, 51
// Consultor E → 97.6, 100, 'Met', 100, 100, 49
// Consultor F → 97.4,  44, 'Met', 100, 41, 10
```

**objetivos**
- Modelo de respaldo (`square` → `respaldo`): continuar trabajando en un esquema de backup sólido para garantizar la continuidad operativa del equipo.
- Análisis de indicadores (`circle` → `indicadores`): evaluar los resultados de la práctica y el desempeño del periodo mediante métricas clave.
- Retrospectiva de equipo (`triangle` → `retrospectiva`): implementar las acciones de mejora continua identificadas durante los ciclos de trabajo.
- Iniciativas estratégicas (`diamond` → `iniciativas`): presentar nuevas propuestas y herramientas orientadas a la optimización y automatización.

**retrospectiva**
- ¿Qué salió bien?: metodología VSM aplicada para identificar oportunidades de mejora · asistentes virtuales para las 6 actividades principales del área · equipo resiliente frente a diversas situaciones · reducción de sábados trabajados con mejor distribución de horarios.
- ¿Qué necesita cambio?: respaldo completo al 50 % para todo el equipo · conversar nuestras debilidades (operacionales y no operacionales) para tener un mejor ritmo de trabajo · autonomía para seguir aprendiendo nuevas actividades · continuidad de prácticas ágiles.
- Nuevas ideas: macros para reportes del área · ajustes precisos a los asistentes virtuales · capacitación interna en liderazgo, ICA e IA · one-to-one entre TL y analista.

**iniciativas** (en `detail`, `problem`, `solution` e `impact` quedan como `TODO` para el dueño)
- **Asistentes virtuales IBM Consulting Assistant** · En progreso · procedimiento backoffice asistido por IA para las 6 actividades principales del área; fine-tuning en progreso. Ítems de ejemplo (uno por actividad, el dueño confirma): Rastreos, Procesos Promexma, Conciliaciones bancarias, Cadenas productivas, Ingresos backoffice, Traspasos intercompañías.
- **Automatizaciones** · Activo · macros para reportes del área; 5 macros activas cubriendo las actividades críticas. Ítems (tecnología: VBA / SAP Scripting): RPA Promexma (Automatización general) · Macro Cheques devueltos (Validación y bloqueo) · Macro Ingresos (Registro SAP) · Macro Depuraciones de saldos menores (Ajuste de cuentas) · Macro Cancelación de ingresos (Reversión documental).
- **Habilidades blandas y capacitación** · En progreso · fortalecimiento del equipo como unidad operativa mediante competencias clave, IA y liderazgo. Ítems: Liderazgo · ICA · IA · One-to-one TL–analista.

---

## 14. Plan de ejecución por fases

Al terminar cada fase: resume archivos creados, decisiones y pendientes, y recomienda abrir una conversación nueva para la siguiente.

| Fase | Modo | Alcance | Criterio de salida |
|---|---|---|---|
| 0 · Plan | Plan | Sin código. Árbol final, dependencias con versión, lista de componentes con props, orden de implementación, riesgos (soporte de View Transitions, animación de Recharts, scroll-snap con teclado) y hasta 5 dudas bloqueantes | Plan aprobado por el usuario |
| 1 · Cimientos | Agent | Scaffolding, `tokens.css` claro/oscuro, fuentes, Tailwind, lint/format/test, hash router, registry con `ErrorBoundary`, shell de sección, hub en esqueleto, `_template`, scripts `new:section` y `check:scope`, validación, CI/CD | `npm run check` verde; una sección de prueba aparece en el hub sin tocar archivos compartidos |
| 2 · Core visual | Agent | Todos los componentes de §10, primitivas de motion, `ImageSlot`/`ScreenFrame`, vectores y `#/_kit` | Cada componente en claro/oscuro, reduced motion, teclado y tabla `sr-only` en gráficas |
| 3 · Hub y navegación | Agent | Grilla editorial, 5 variantes de portada, collage, parallax, índice ⌘K, View Transitions, teclas de presentación, estilos de impresión | Recorrido completo hub → secciones → hub solo con teclado |
| 4 · Siembra | Agent | Las 8 secciones con `meta`, `content` (mocks §13, `draft`) y slides según §9; drill-down completo en `iniciativas` | Navegación de principio a fin con datos mock |
| 5 · Bob y docs | Agent | `AGENTS.md`, skill + references + checklist, `custom_modes.yaml`, reglas, `.bobignore`, `CODEOWNERS`, plantilla de PR, `README.md`; todo verificado contra el código real | Rutas, nombres y comandos de los docs coinciden con el repo |
| 6 · Prueba del flujo | `section-builder` | En una conversación nueva, invoca `/showcase-section` para completar `retrospectiva` como si fueras un integrante. Verifica que solo cambió `src/sections/retrospectiva/` y que `check` y `check:scope` pasan; ajusta skill y `AGENTS.md` con lo aprendido | Reporte de la prueba con los ajustes aplicados |

---

## 15. Definition of Done

### 15.1 Core

- `npm run check` verde en CI; build de producción sin warnings.
- Lighthouse en el hub: Performance ≥ 90, Accessibility ≥ 95.
- Contraste AA en ambos temas; foco visible; navegación completa por teclado.
- `prefers-reduced-motion` respetado en todo.
- Sin valores de diseño literales fuera de `tokens.css` (regla de lint o búsqueda en CI).
- Una sección rota no afecta al resto (probado forzando un error).
- `#/_kit` muestra todos los componentes.

### 15.2 Sección (va en `checklist.md`)

- `meta` y `content` válidos; `status: 'ready'` sin `TODO` ni imágenes pendientes.
- Solo componentes del core; cifras formateadas con `format.ts`; cálculos derivados, no escritos a mano.
- Textos según `copy-style.md`.
- Revisada en claro/oscuro, 1280/1440/1920 px, reduced motion y teclado.
- Imágenes ≤ 400 KB, con `alt`, sin datos sensibles.
- PR solo con cambios en su carpeta; datos verificados por su dueño.

---

## 16. Qué NO hacer

- Gráficas 3D, pie o donut con más de 4 categorías, doble eje fuera del `ComboChart` de MM, leyendas cuando se puede etiquetar directo.
- Gradientes saturados, neón, glassmorphism marcado, sombras duras, emojis en la UI, ilustraciones de stock.
- Loops infinitos, rebotes, efectos de tipeo, carruseles automáticos, confeti.
- Texto sobre imagen sin scrim.
- Colores, fuentes, tamaños o duraciones literales fuera de los tokens.
- Lógica de negocio en los slides.
- Nombres reales en mocks o datos personales visibles en imágenes.
- Editar otras secciones o el core desde una rama de sección.
- Ejecutar `/init` sobre este repo.

---

## 17. Empieza así

Ejecuta la **Fase 0** y responde con:

1. Árbol de archivos final.
2. Dependencias con versión propuesta.
3. Lista de componentes del core con sus props principales.
4. Orden de implementación de las Fases 1–6.
5. Riesgos técnicos y cómo los mitigas.
6. Hasta 5 dudas bloqueantes (si no hay, dilo).

No crees archivos de código hasta que apruebe el plan.
