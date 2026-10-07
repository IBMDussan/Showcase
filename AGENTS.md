# AGENTS.md — Showcase BackOffice CashApps
Última actualización: 2025-07-14

---

## 1. Propósito y audiencia

Presentación web modular del área **BackOffice CashApps · Q3** construida con Vite 6 + React 19 + TypeScript strict + Tailwind v4. Cada integrante del equipo posee una sección; Bob la construye guiado por el skill `showcase-section` en el modo `section-builder`. El `LEAD` es dueño de todo lo compartido.

---

## 2. Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:5173` |
| `npm run build` | Typecheck + build de producción en `dist/` |
| `npm run check` | tsc + eslint + vitest + build — debe pasar antes de cada commit |
| `npm run validate` | Valida esquemas Zod de todas las secciones |
| `npm run test` | Ejecuta la suite de tests |
| `npm run new:section -- <slug> "<Título>"` | Crea la carpeta de una sección nueva desde `_template` |
| `npm run check:scope` | Verifica que los cambios staged solo toquen `src/sections/<slug>/` |

---

## 3. Mapa del repo

```
src/
  app/          → hub, shell, router, registry — solo LEAD
  core/         → componentes, gráficas, motion, esquemas, lib — solo LEAD
    theme/tokens.css  → ÚNICA fuente de valores de diseño
    schemas/          → meta.ts, content.ts, blocks.ts (Zod)
    lib/              → format.ts, thresholds.ts, people.ts, stats.ts
  sections/     → una carpeta por sección (integrantes)
    _template/  → base para nuevas secciones
  dev/kit/      → galería de componentes (#/_kit, solo dev)
.bob/           → configuración de Bob — solo LEAD
.github/        → CI/CD y CODEOWNERS — solo LEAD
scripts/        → new-section.mjs, check-scope.mjs — solo LEAD
```

---

## 4. Contrato de una sección

Cada sección vive en `src/sections/<slug>/` y tiene exactamente 3 archivos:

**`meta.ts`** — metadatos del hub:
```ts
import type { SectionMeta } from '@core/schemas/meta'
const meta: SectionMeta = {
  slug: 'mi-seccion',
  title: 'Título de la sección',
  owner: '@github-handle',
  status: 'draft',           // 'draft' | 'ready' | 'archived'
  order: 3,                  // posición en el hub
  cover: {
    type: 'stat',            // 'feature'|'stat'|'chart'|'list'|'type'
    size: 'md',              // 'sm'|'md'|'lg'
    glyph: 'circle',         // ring|circle|square|arc|hexagon|bars|triangle|diamond
    headline: 'Título corto ≤ 6 palabras',
    eyebrow: 'CATEGORÍA · Q3',
    metric: { value: '98 %', label: 'Cobertura' },  // opcional
  },
  tags: [],
}
export default meta
```

**`content.ts`** — datos de la sección (Zod parse):
```ts
import { SectionContentSchema } from '@core/schemas/blocks'
const content = SectionContentSchema.parse({ slides: [ … ] })
export default content
```

**`index.tsx`** — componente React que usa `content` y componentes del core:
```tsx
import content from './content'
// import { StatCard } from '@core/components/…'
export default function MiSeccion() { … }
```

**Regla de oro:** una sección nunca importa de otra sección ni modifica archivos fuera de su carpeta.

---

## 5. Propiedad

| Quién | Qué puede tocar |
|---|---|
| **Dueño de sección** | Solo `src/sections/<su-slug>/` |
| **LEAD** | Todo lo demás: `src/core/`, `src/app/`, `.bob/`, `.github/`, `scripts/`, `package.json` |

Si algo del core falla o falta un componente, el dueño abre un issue `core:` describiendo el props que necesita — no lo parchea localmente.

---

## 6. Sistema de diseño (resumen)

Todos los valores viven en `src/core/theme/tokens.css`. **Nunca uses valores literales de color, fuente, tamaño o duración fuera de ese archivo.**

| Categoría | Tokens clave |
|---|---|
| Color base | `--color-bg`, `--color-surface`, `--color-border`, `--color-text`, `--color-text-muted` |
| Acento | `--color-accent`, `--color-secondary` |
| Datos | `--color-data-1` … `--color-data-6` |
| Umbrales | `--color-threshold-perfect/excellent/optimal/attention` |
| Tipografía | `--font-display` (Source Serif 4), `--font-sans` (Inter), `--font-mono` (IBM Plex Mono) |
| Escala de texto | `--text-xs` … `--text-4xl` |
| Radios | `--radius-sm/md/lg/xl/2xl/full` |

**Umbrales numéricos:** Perfecto 100 % · Excelente ≥ 95 % · Óptimo ≥ 90 % · Requiere atención < 90 %

Ver detalle completo en `.bob/skills/showcase-section/references/design-tokens.md`.

---

## 7. Motion (resumen)

- Usa `Reveal`, `Stagger`, `CountUp`, `DrawPath`, `Parallax` de `@core/motion/`.
- Duraciones: `--duration-fast` (120 ms) · `--duration-normal` (220 ms) · `--duration-slow` (400 ms).
- `prefers-reduced-motion`: solo opacidad de 150 ms, sin transformaciones.
- Sin loops infinitos, rebotes ni efectos de tipeo.

Ver `.bob/skills/showcase-section/references/motion.md`.

---

## 8. Imágenes — `ImageSlot`

```tsx
<ImageSlot src="./assets/imagen.webp" alt="Descripción accesible" ratio="16/9"
  brief="Captura de la pantalla de SAP mostrando el módulo de traspasos" />
```

- En dev sin `src`: muestra placeholder con el `brief`.
- En prod sin `src`: fallback vectorial con el glyph de la sección.
- Archivos en `src/sections/<slug>/assets/` · ≤ 400 KB · sin datos sensibles visibles.

Ver `.bob/skills/showcase-section/references/image-slots.md`.

---

## 9. Mapa de contenido

| # | Slug | Título | Glyph | Tipo | Estado |
|---|---|---|---|---|---|
| 1 | `objetivos` | Objetivos de la iteración | ring | feature·lg | draft |
| 2 | `indicadores` | Evidencias e indicadores | circle | stat·md | draft |
| 3 | `respaldo` | Modelo de respaldo | square | chart·md | draft |
| 4 | `mm-performance` | MM Performance & Metrics | arc | chart·sm | draft |
| 5 | `cargue-horas` | Cargue de horas: SAP vs TIME | hexagon | stat·sm | draft |
| 6 | `desempeno` | Métricas de desempeño | bars | type·sm | draft |
| 7 | `retrospectiva` | Retrospectiva | triangle | list·md | draft |
| 8 | `iniciativas` | Iniciativas | diamond | feature·lg | draft |

---

## 10. Flujo Git y PR

1. Crear rama: `git checkout -b section/<slug>`
2. Trabajar solo en `src/sections/<slug>/`
3. Antes de PR: `git pull --rebase origin main` + `npm run check` + `npm run check:scope`
4. Commit convencional: `feat(indicadores): agrega slide de volumen mensual`
5. Abrir PR con la plantilla de `.github/pull_request_template.md`
6. El LEAD aprueba según `CODEOWNERS`

Ramas reservadas: `section/<slug>` para integrantes · `core/<tema>` para LEAD.

---

## 11. Definition of Done de una sección

- [ ] `meta` y `content` válidos (`npm run validate` verde)
- [ ] `status: 'ready'`; sin `TODO` ni imágenes pendientes
- [ ] Solo componentes del core; cifras con `format.ts`
- [ ] Textos según `copy-style.md` (sentence case, ≤ 6 palabras en título)
- [ ] Revisada en claro/oscuro, 1280/1440/1920 px, reduced motion y teclado
- [ ] Imágenes ≤ 400 KB, con `alt`, sin datos sensibles
- [ ] PR solo con cambios en la carpeta de la sección; datos verificados por su dueño

---

## 12. Cómo trabajar con Bob en este repo

1. Selecciona el modo **`section-builder`** en el selector de modos de Bob.
2. Escríbele en lenguaje natural qué quieres hacer, por ejemplo:
   > *"Quiero completar mi sección de indicadores con los datos del Q3"*
3. Bob activará automáticamente el skill `showcase-section` y te pedirá los datos necesarios.
4. Responde las preguntas con tus cifras reales; Bob generará el código correcto.
5. Bob correrá `npm run check` y `npm run check:scope` antes de proponer los cambios.

**⚠️ No ejecutes `/init` en este repo.** Reescribiría este archivo con un escaneo automático. Si alguien lo ejecuta accidentalmente, revisar el diff completo antes de hacer commit.

Mantén activo `bob-code.useAgentRules` en la configuración de Bob.

---

## 13. Qué NO hacer

- Gráficas 3D, pie/donut con más de 4 categorías, doble eje fuera del `ComboChart`.
- Gradientes saturados, neón, glassmorphism, sombras duras, emojis en la UI.
- Loops infinitos, rebotes, efectos de tipeo, carruseles automáticos.
- Colores, fuentes, tamaños o duraciones literales fuera de `tokens.css`.
- Lógica de negocio dentro de los slides.
- Nombres reales en mocks o datos personales visibles en imágenes.
- Editar otras secciones o el core desde una rama de sección.
- Agregar dependencias npm sin pedido explícito del LEAD.
