# Showcase BackOffice CashApps

Presentación web modular del área **BackOffice CashApps · Q3** construida con Vite 6 + React 19 + TypeScript + Tailwind v4.

> **Repositorio privado / interno.** Contiene métricas por persona — no compartir públicamente.

---

## Quickstart (primera vez)

### Requisitos
- [Node.js LTS 22](https://nodejs.org/) — verifica con `node -v`
- [IBM Bob](https://w3.ibm.com/developer/docs/bob) instalado en VS Code
- Acceso al repositorio en GitHub

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/<org>/<repo>.git
cd showcase-backoffice-cashapps

# 2. Instalar dependencias
npm install

# 3. Arrancar el servidor de desarrollo
npm run dev
# → http://localhost:5173
```

Abre `http://localhost:5173` en el navegador. Verás el hub con las secciones disponibles.

---

## Cómo trabaja el equipo (con Bob)

No necesitas saber código. Bob lo hace por ti.

### 1. Abre el proyecto en VS Code con Bob

Asegúrate de tener el panel de Bob visible (icono de chat en la barra lateral).

### 2. Selecciona el modo `section-builder`

En el selector de modos (parte inferior del chat de Bob), selecciona **Section Builder**.

![Selector de modos en Bob](.github/docs/mode-selector.png)

### 3. Escríbele a Bob en lenguaje natural

Dile qué quieres hacer, por ejemplo:

> *"Quiero completar mi sección de indicadores con los datos del Q3"*

> *"Tengo los datos de retrospectiva, ayúdame a armar los slides"*

Bob activará automáticamente las instrucciones del proyecto y te pedirá los datos que necesite.

### 4. Responde las preguntas con tus datos reales

Bob te preguntará cosas como:
- *"¿Cuál fue el % de cobertura de Rastreos en el Q3?"*
- *"¿Cuántos rastreos se procesaron en enero?"*

Responde con tus cifras reales. Si no tienes un dato todavía, dile *"no lo tengo aún"* y Bob pondrá un placeholder.

### 5. Revisa el resultado

```bash
npm run dev
```

Navega a tu sección en `http://localhost:5173`. Revisa en modo claro y oscuro (botón en el hub).

### 6. Sube los cambios

Pídele a Bob:
> *"Sube los cambios a una rama nueva y crea el Pull Request"*

Bob hará el commit, el push y abrirá el PR por ti.

---

## Comandos disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run check` | Validación completa (typecheck + lint + tests + build) |
| `npm run validate` | Valida los datos de todas las secciones |
| `npm run new:section -- <slug> "<Título>"` | Crea una nueva sección desde la plantilla |
| `npm run check:scope` | Verifica que solo tocaste tu sección |

---

## Estructura del proyecto

```
src/
  sections/          ← Aquí trabaja el equipo (una carpeta por sección)
    indicadores/
    retrospectiva/
    …
  app/               ← Hub, shell, router — solo LEAD
  core/              ← Componentes compartidos — solo LEAD
```

Cada sección tiene 3 archivos:
- `meta.ts` — título, portada, dueño, estado
- `content.ts` — datos en formato estructurado
- `index.tsx` — slides de la presentación

---

## Secciones del showcase

| # | Sección | Dueño | Estado |
|---|---|---|---|
| 1 | Objetivos de la iteración | TBD | draft |
| 2 | Evidencias e indicadores | TBD | draft |
| 3 | Modelo de respaldo | TBD | draft |
| 4 | MM Performance & Metrics | TBD | draft |
| 5 | Cargue de horas: SAP vs TIME | TBD | draft |
| 6 | Métricas de desempeño | TBD | draft |
| 7 | Retrospectiva | TBD | draft |
| 8 | Iniciativas | TBD | draft |

---

## Flujo de trabajo Git

```
main (protegida)
  └── section/indicadores      ← una rama por sección
  └── section/retrospectiva
  └── core/nuevo-componente    ← solo LEAD
```

1. Crear tu rama: `git checkout -b section/<tu-slug>`
2. Trabajar solo en `src/sections/<tu-slug>/`
3. Antes del PR: `git pull --rebase origin main`
4. El PR requiere CI verde + aprobación del LEAD

---

## Preguntas frecuentes

**¿Puedo tocar archivos fuera de mi sección?**
No. El modo `section-builder` y el CI lo bloquean automáticamente.

**¿Y si necesito un componente que no existe?**
Díselo a Bob: *"Necesito una gráfica que no existe en el core"*. Bob redactará la propuesta para el LEAD.

**¿Cómo anonimizo nombres reales?**
Agrega `?anon=1` a la URL: `http://localhost:5173/?anon=1`. Los nombres se reemplazan por iniciales.

**¿Dónde veo todos los componentes disponibles?**
En `http://localhost:5173/#/_kit` (solo en modo desarrollo).

---

## Para el LEAD

- Reemplaza `@lead` en `CODEOWNERS` y `hub.config.ts` con tu handle de GitHub.
- Reemplaza `<org>/<repo>` con la URL real del repo.
- Asigna los owners de cada sección en `CODEOWNERS` y en `src/sections/*/meta.ts`.
- El repositorio debe ser **privado o interno** en GitHub.
