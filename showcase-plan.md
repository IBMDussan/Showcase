# Plan · Showcase BackOffice CashApps

> **Variables confirmadas**
> - `PERIODO` = Q3 (año TBD)
> - `AREA` = BackOffice CashApps
> - `REPO` = TBD (placeholder `<org>/<repo>`)
> - `LEAD` = TBD (placeholder `@lead`)
> - Owners de secciones = todos TBD
> - Umbrales: Perfecto 100 % · Excelente ≥ 95 % · Óptimo ≥ 90 % · Requiere atención < 90 %

---

## Visión general

Construir el **punto de convergencia (core)** de una presentación web modular para el showcase Q3 del área BackOffice CashApps: hub editorial, shell de sección, sistema de diseño completo, 44 componentes compartidos, registro automático de secciones, 8 secciones sembradas con datos mock, CI/CD y configuración de Bob para el equipo.

**Stack:** Vite 6 · React 19 · TypeScript 5.8 strict · Tailwind CSS v4 · React Router v7 (hash) · Motion 12 · Recharts 2 · Zod 3 · Node LTS 22.

**Restricción clave:** ninguna sección puede tocar archivos compartidos para aparecer en el hub.

---

## Árbol de archivos final

```
.
├── AGENTS.md
├── README.md
├── .nvmrc                              (node 22)
├── .bobignore
├── .bob/
│   ├── custom_modes.yaml               (modo section-builder)
│   ├── rules/01-showcase.md
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
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── scripts/
│   ├── new-section.mjs
│   └── check-scope.mjs
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── router.tsx
│   │   ├── registry.ts
│   │   ├── providers.tsx
│   │   ├── hub.tsx
│   │   ├── hub.config.ts
│   │   ├── shell.tsx
│   │   ├── index-palette.tsx
│   │   └── assets/logo.svg             (placeholder; el equipo lo reemplaza)
│   ├── core/
│   │   ├── theme/tokens.css            (ÚNICA fuente de valores de diseño)
│   │   ├── components/
│   │   │   ├── layout/                 (SectionShell, Slide, SlideHeader, Eyebrow, Insight, Grid)
│   │   │   └── content/               (PeriodHero, ObjectiveCard, RetroBoard, StatusChip, …)
│   │   ├── charts/                     (ProgressList, BarList, Heatmap, CoverageMatrix, …)
│   │   ├── motion/                     (Reveal, Stagger, CountUp, DrawPath, Parallax, usePresentationKeys)
│   │   ├── media/                      (ImageSlot, VideoSlot, ScreenFrame)
│   │   ├── vectors/                    (Glyph, Connector, GridLines, Grain)
│   │   ├── schemas/                    (meta.ts, content.ts, blocks.ts — zod)
│   │   └── lib/
│   │       ├── format.ts
│   │       ├── thresholds.ts
│   │       ├── people.ts
│   │       └── stats.ts
│   ├── dev/kit/                        (#/_kit galería — solo dev)
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
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── eslint.config.ts
├── prettier.config.ts
├── vitest.config.ts
└── docs/bob/00-bootstrap-prompt.md
```

---

## Dependencias con versión

| Categoría | Paquete | Versión |
|---|---|---|
| **Runtime** | `react` | `^19.1` |
| | `react-dom` | `^19.1` |
| | `react-router` | `^7.6` |
| | `motion` | `^12.x` |
| | `recharts` | `^2.15` |
| | `d3-scale` | `^4.0` |
| | `d3-shape` | `^3.2` |
| | `zod` | `^3.24` |
| | `lucide-react` | `^0.511` |
| **Fuentes** | `@fontsource-variable/source-serif-4` | `^5.2` |
| | `@fontsource-variable/inter` | `^5.1` |
| | `@fontsource/ibm-plex-mono` | `^5.1` |
| **Build** | `vite` | `^6.3` |
| | `@vitejs/plugin-react` | `^4.5` |
| | `typescript` | `^5.8` |
| **Estilos** | `tailwindcss` | `^4.1` |
| | `@tailwindcss/vite` | `^4.1` |
| **Calidad** | `eslint` | `^9.x` |
| | `@typescript-eslint/eslint-plugin` | `^8.x` |
| | `prettier` | `^3.5` |
| | `vitest` | `^3.2` |
| | `@vitest/coverage-v8` | `^3.2` |
| | `@testing-library/react` | `^16.x` |

Node LTS 22 fijado en `.nvmrc`. Las secciones no pueden agregar dependencias.

---

## Riesgos técnicos

| # | Riesgo | Severidad | Mitigación |
|---|---|---|---|
| R1 | View Transitions API ~85% cobertura (sin Firefox pre-v130) | Media | Detectar `document.startViewTransition`; degradar a crossfade con `motion`. No bloquea funcionalidad. |
| R2 | Animación de Recharts (barras desde la base) no es nativa con stagger | Media | Usar `isAnimationActive` + animar prop `data` con `motion` en el wrapper del core. Transparente para secciones. |
| R3 | `scroll-snap` + teclado puede producir saltos dobles | Media | `usePresentationKeys` intercepta `keydown` y usa `scrollIntoView` sobre el `<Slide>` target, evitando el scroll nativo. |
| R4 | Tailwind v4 API nueva (`@theme` CSS-first) | Baja-Media | Fijar versión; usar solo sintaxis v4. Fallback: Tailwind v3 + CSS custom properties sin cambiar tokens. |
| R5 | GitHub Pages puede no estar habilitado en la organización | Baja | `deploy.yml` sube `dist/` como artefacto descargable si Pages no está disponible. Hash router evita 404 en cualquier caso. |

---

## Sub-tareas

---

### Fase 1 · Cimientos

**Intent:** Crear el andamiaje completo del proyecto: configuración de herramientas, sistema de tokens, router, registry con ErrorBoundary, shell de sección, hub esqueleto, scripts de utilidad y CI/CD. Todo debe pasar `npm run check` antes de agregar componentes visuales.

**Expected Outcomes:**
- `npm run check` (typecheck + lint + validate + test + build) pasa en verde.
- El servidor de dev arranca en `http://localhost:5173`.
- Una sección de prueba (usando `_template`) aparece en el hub sin tocar archivos compartidos.
- Los scripts `new:section` y `check:scope` funcionan.
- CI/CD configurado en `.github/workflows/`.

**Todo List:**
- [ ] Inicializar proyecto con `npm create vite` (react-ts), fijar Node 22 en `.nvmrc`
- [ ] Instalar todas las dependencias de la tabla
- [ ] Configurar `tsconfig.json` en modo `strict`
- [ ] Configurar Tailwind v4 con plugin de Vite (`@tailwindcss/vite`)
- [ ] Crear `src/core/theme/tokens.css` con todos los tokens de color, tipografía, espacio, radio, sombra, motion y datos
- [ ] Importar fuentes Fontsource en `main.tsx`; verificar que funcionen offline
- [ ] Configurar ESLint (flat config), Prettier y Vitest
- [ ] Crear hash router en `src/app/router.tsx` con rutas `#/`, `#/s/:slug`, `#/s/:slug/*`, `#/_kit`
- [ ] Crear `src/app/registry.ts` con `import.meta.glob`, validación zod, `React.lazy` + `Suspense` + `ErrorBoundary`
- [ ] Crear esquemas zod en `src/core/schemas/` (meta, content, bloques, variantes de cover)
- [ ] Crear `src/app/hub.tsx` esqueleto (sin estilos finales; solo muestra tarjetas de texto)
- [ ] Crear `src/app/shell.tsx` esqueleto con header, área de slides y pie
- [ ] Crear `src/core/lib/format.ts`, `thresholds.ts`, `people.ts`, `stats.ts`
- [ ] Crear `src/sections/_template/` con `meta.ts`, `content.ts`, `index.tsx` mínimos
- [ ] Escribir script `scripts/new-section.mjs`
- [ ] Escribir script `scripts/check-scope.mjs`
- [ ] Agregar scripts npm: `dev`, `build`, `check`, `validate`, `test`, `new:section`, `check:scope`
- [ ] Crear test de validación en Vitest que recorra todas las secciones
- [ ] Crear `.github/workflows/ci.yml` y `deploy.yml`
- [ ] Crear `.github/CODEOWNERS` y `pull_request_template.md`
- [ ] Crear `.bobignore`
- [ ] Verificar `npm run check` verde

**Relevant Context:**
- Registry: `src/app/registry.ts` — patrón `import.meta.glob` con `eager: true` para metas y lazy para loaders
- Tokens: `src/core/theme/tokens.css` — sintaxis `@theme { --color-bg: ... }` de Tailwind v4
- Riesgo R4: si `@tailwindcss/vite` tiene problemas, revisar compatibilidad antes de continuar

**Status:** [ ] pending

---

### Fase 2 · Core visual

**Intent:** Construir los 44 componentes compartidos del core (layout, KPIs, gráficas, contenido, drill-down, media, motion, vectores, hub) y la galería `#/_kit`. Ninguna sección necesita tocarlos para usarlos.

**Expected Outcomes:**
- Todos los componentes renderizan en claro/oscuro.
- `prefers-reduced-motion` respetado: sin transformaciones, solo opacidad 150 ms.
- Cada gráfica tiene `<figure>`, `<figcaption>`, `aria-label` y tabla `sr-only`.
- `#/_kit` muestra todos los componentes con datos mock.
- `npm run check` sigue verde.

**Todo List:**
- [ ] Implementar componentes de Layout: `SectionShell`, `Slide`, `SlideHeader`, `Eyebrow`, `Insight`, `Grid`
- [ ] Implementar componentes KPI: `StatCard`, `StatStrip`, `StatPanel`, `Delta`, `SequenceChips`
- [ ] Implementar gráficas con Recharts: `ProgressList`, `BarList`, `ComboChart`, `BarLineTrend`, `Sparkline`, `BulletChart`
- [ ] Implementar gráficas con SVG + d3: `Heatmap`, `CoverageMatrix`, `BeforeAfter`
- [ ] Implementar `DataTable` con orden por columna, micro-barras y umbrales
- [ ] Implementar componentes de Contenido: `PeriodHero`, `ObjectiveCard`, `RetroBoard`, `ActionList`, `FlowSteps`, `Timeline`, `StatusChip`, `TagChip`, `SourceCompare`
- [ ] Implementar componentes de Drill-down: `InitiativeGrid`, `InitiativeCard`, `ItemCard`, `DetailPanel`, `ImpactStats`
- [ ] Implementar Media: `ImageSlot` (placeholder dev, fallback vectorial prod), `VideoSlot`, `ScreenFrame`
- [ ] Implementar Motion: `Reveal`, `Stagger`, `CountUp`, `DrawPath`, `Parallax`, hook `usePresentationKeys`
- [ ] Implementar Vectores: `Glyph` (8 marcas con animación `pathLength`), `Connector`, `GridLines`, `Grain`
- [ ] Construir `#/_kit` en `src/dev/kit/` con datos mock para cada componente
- [ ] Revisar contraste AA en ambos temas para todos los componentes
- [ ] Verificar `npm run check` verde

**Relevant Context:**
- Riesgo R2: animación de Recharts — encapsular en wrapper, animar `data` prop con `motion`
- `CountUp`: mostrar valor final directamente si `prefers-reduced-motion`
- `ImageSlot`: en dev sin `src` → placeholder con `brief`; en prod sin `src` → fallback vectorial con glyph de la sección

**Status:** [ ] pending

---

### Fase 3 · Hub y navegación

**Intent:** Implementar el hub editorial completo (grilla 12 col dense, 5 variantes de tarjeta, efecto collage, parallax, fragmentos flotantes), la navegación de presentación por teclado, View Transitions hub→sección, paleta de índice ⌘K y estilos de impresión.

**Expected Outcomes:**
- Recorrido completo hub → sección → hub únicamente con teclado.
- Todas las teclas de la tabla §5.4 funcionan.
- View Transition de 450 ms al entrar a una sección; degradación elegante sin soporte.
- Paleta ⌘K abre y filtra secciones.
- En ≥ 1440 px las tarjetas `lg` tienen efecto collage (desplazamiento Y).
- Parallax desactivado en touch.
- `@media print` produce un slide por página 16:9.

**Todo List:**
- [ ] Implementar `Masthead` con área, periodo, titular y logo placeholder
- [ ] Implementar `HubGrid` con grilla 12 col `grid-auto-flow: dense` y tamaños por `cover.size`
- [ ] Implementar las 5 variantes de `CoverCard`: `feature`, `stat`, `chart`, `list`, `type`
- [ ] Añadir folio, eyebrow, título, glyph y "Ver sección →" comunes a todas las tarjetas
- [ ] Implementar efecto collage: desplazamiento Y −16/−24 px en tarjetas `lg` a ≥ 1440 px
- [ ] Implementar parallax ±6 px en fragmentos y ±2 px en tarjetas (desactivar en touch)
- [ ] Añadir fragmento flotante: campo de búsqueda translúcido que abre `IndexPalette`
- [ ] Añadir `GridLines` y `Grain` al fondo del hub
- [ ] Implementar pie del hub: fecha de build y conteo draft/ready (solo dev)
- [ ] Implementar `IndexPalette` funcional con filtro de texto y navegación por teclado
- [ ] Implementar `usePresentationKeys` con todas las teclas de §5.4
- [ ] Implementar View Transitions: `view-transition-name` compartido entre tarjeta y header de sección
- [ ] Implementar Shell completo: barra de progreso, puntos clicables, pie con nav anterior/índice/siguiente
- [ ] Añadir `?anon=1`: `people.ts` reemplaza nombres por iniciales en toda la app
- [ ] Añadir `?drafts`: mostrar secciones con `status: 'draft'` en prod
- [ ] Agregar `@media print` al shell (un slide por página 16:9)
- [ ] Verificar navegación completa solo con teclado (hub + sección + drill-down)
- [ ] Verificar `npm run check` verde

**Relevant Context:**
- Riesgo R1: View Transitions — detectar `document.startViewTransition`
- Riesgo R3: scroll-snap + teclado — `usePresentationKeys` con `scrollIntoView`
- Tema: toggle `data-theme` en `<html>` desde `prefers-color-scheme`; persistir en localStorage; sin flash al cargar (script inline antes del primer render)

**Status:** [ ] pending

---

### Fase 4 · Siembra de secciones

**Intent:** Crear las 8 secciones con `meta.ts`, `content.ts` (datos mock de §13, `status: 'draft'`) y `index.tsx` con slides según §9. Incluye el drill-down completo de `iniciativas`.

**Expected Outcomes:**
- Navegación de principio a fin con datos mock funciona sin errores.
- Cada sección aparece en el hub con su variante de portada correcta.
- `npm run validate` pasa para las 8 secciones.
- Drill-down de `iniciativas` navega N1 → N2 → N3 con `Esc` retrocediendo niveles.
- URLs profundas `#/s/iniciativas/<id>/<itemId>` funcionan.

**Todo List:**
- [ ] Crear `objetivos`: `meta` (type·lg, glyph ring), `content` (mock §13), slides: PeriodHero + 4 ObjectiveCard con Connector
- [ ] Crear `indicadores`: `meta` (stat·md, glyph circle), `content` (mock §13), slides: StatStrip + ProgressList + Heatmap
- [ ] Crear `respaldo`: `meta` (chart·md, glyph square), `content` (mock §13), slides: StatCard+BarList + CoverageMatrix + Delta opcional
- [ ] Crear `mm-performance`: `meta` (chart·sm, glyph arc), `content` (mock §13), slides: StatStrip + ComboChart + ImageSlot opcional
- [ ] Crear `cargue-horas`: `meta` (stat·sm, glyph hexagon), `content` (mock §13), slide: StatPanel + BarLineTrend + SourceCompare + SequenceChips
- [ ] Crear `desempeno`: `meta` (type·sm, glyph bars), `content` (mock §13), slides: DataTable + BulletChart
- [ ] Crear `retrospectiva`: `meta` (list·md, glyph triangle), `content` (mock §13), slides: RetroBoard + ActionList opcional + ImageSlot opcional
- [ ] Crear `iniciativas`: `meta` (feature·lg, glyph diamond), `content` (mock §13), drill-down N1+N2+N3 completo
- [ ] Configurar subrutas `#/s/iniciativas/:initiativeId/:itemId` en el router
- [ ] Verificar que cada sección usa `cover` derivado de `content` (no valores escritos a mano)
- [ ] Verificar `npm run validate` verde para las 8 secciones
- [ ] Verificar `npm run check` verde

**Relevant Context:**
- Los datos mock están en §13 del prompt de bootstrap (`docs/bob/00-bootstrap-prompt.md`)
- `status: 'draft'` en todas las secciones sembradas
- `?anon=1` debe ocultar nombres en `respaldo` y `desempeno`
- Owners: todos `TBD`; PERIODO: Q3; AREA: BackOffice CashApps

**Status:** [ ] pending

---

### Fase 5 · Bob y documentación

**Intent:** Crear toda la capa de configuración de Bob (`AGENTS.md`, skill, modo, reglas) y documentación para el equipo. Los contenidos deben ser verídicos contra el código real de F1–F4.

**Expected Outcomes:**
- `AGENTS.md` cargado automáticamente por Bob en cada conversación; ≤ 400 líneas; comandos y rutas correctos.
- Skill `showcase-section` invocable con `/showcase-section`; ≤ 120 líneas en `SKILL.md`.
- Modo `section-builder` aparece en el selector de modos con `fileRegex` válido.
- Reglas en `.bob/rules/` y `.bob/rules-section-builder/` activas.
- `README.md` con quickstart funcional.
- `.bobignore` correcto.
- `CODEOWNERS` con `LEAD` como TBD placeholder.

**Todo List:**
- [ ] Escribir `AGENTS.md` con las 13 secciones obligatorias (§11.1); verificar cada comando y ruta contra el código
- [ ] Escribir `.bob/skills/showcase-section/SKILL.md` con frontmatter exacto de §11.2 y pasos accionables
- [ ] Escribir `references/content-schemas.md` con cada esquema de bloque y ejemplo
- [ ] Escribir `references/components.md` con catálogo, props, tabla de decisión y do/don't
- [ ] Escribir `references/design-tokens.md` con nombres de tokens y cuándo usarlos (sin valores)
- [ ] Escribir `references/motion.md` con primitivas, tokens de duración y reduced motion
- [ ] Escribir `references/image-slots.md` con §8 completo, ejemplos de brief y alt
- [ ] Escribir `references/copy-style.md` con reglas de redacción
- [ ] Escribir `checklist.md` con Definition of Done de una sección (§15.2)
- [ ] Crear `.bob/custom_modes.yaml` con modo `section-builder` exactamente como §11.3
- [ ] Crear `.bob/rules/01-showcase.md` (≤ 25 líneas)
- [ ] Crear `.bob/rules-section-builder/01-scope.md`
- [ ] Crear `.bobignore`
- [ ] Crear `README.md` con quickstart para humanos
- [ ] Verificar que el modo `section-builder` aparece en el selector de Bob
- [ ] Verificar `npm run check` verde

**Relevant Context:**
- `AGENTS.md` debe tener "Última actualización: <fecha>" al inicio
- NO ejecutar `/init` en este repo (reescribiría `AGENTS.md` con un escaneo automático)
- `fileRegex` en `custom_modes.yaml`: `^src/sections/[a-z0-9-]+/.+` — verificar que no bloquee la carga del archivo

**Status:** [ ] pending

---

### Fase 6 · Prueba del flujo de equipo

**Intent:** Validar end-to-end el flujo de un integrante real usando el modo `section-builder` para completar `retrospectiva`. Confirmar que solo se tocan los archivos de esa sección y que CI pasa.

**Expected Outcomes:**
- Solo `src/sections/retrospectiva/**` aparece en el diff.
- `npm run check` y `npm run check:scope` pasan en verde.
- Skill y `AGENTS.md` ajustados con las fricciones encontradas.
- Reporte de la prueba escrito.

**Todo List:**
- [ ] En conversación nueva con modo `section-builder`, invocar `/showcase-section` para `retrospectiva`
- [ ] Completar slides con datos reales (o confirmar mocks) siguiendo el flujo del skill
- [ ] Verificar que `check:scope` detecta y bloquea cualquier cambio fuera de `src/sections/retrospectiva/`
- [ ] Anotar fricciones o pasos confusos del skill
- [ ] Ajustar `SKILL.md`, `checklist.md` y `AGENTS.md` según lo aprendido
- [ ] Documentar el reporte de la prueba

**Relevant Context:**
- Esta fase se ejecuta en una **conversación nueva** con modo `section-builder`
- El objetivo es encontrar problemas en el flujo antes de que el equipo empiece

**Status:** [ ] pending

---

## Placeholders pendientes de completar

| Placeholder | Dónde aparece | Quién lo completa |
|---|---|---|
| `REPO` (`<org>/<repo>`) | `AGENTS.md`, `CODEOWNERS`, `deploy.yml` | LEAD cuando cree el repo |
| `LEAD` (`@lead`) | `CODEOWNERS`, `hub.config.ts`, `AGENTS.md` | LEAD |
| Año de Q3 | `hub.config.ts`, `AGENTS.md` | LEAD |
| Owners de secciones | `src/sections/*/meta.ts` | Cada integrante en su PR |
| `src/app/assets/logo.svg` | Hub masthead | El equipo |
