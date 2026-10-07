## Descripción
<!-- Describe qué cambia y por qué -->

## Tipo de cambio
- [ ] Nueva sección (`section/<slug>`)
- [ ] Componente compartido (`feat/`)
- [ ] Fix
- [ ] Infraestructura / configuración
- [ ] Documentación

## Checklist

### Para PRs de sección (`section/<slug>`)
- [ ] Solo toca archivos en `src/sections/<slug>/`  
  _(verificar con `npm run check:scope`)_
- [ ] `meta.ts` pasa `npm run validate`
- [ ] `content.ts` pasa `npm run validate`
- [ ] `npm run check` pasa en verde localmente
- [ ] El slug en `meta.ts` coincide con el nombre de la carpeta
- [ ] `status` seteado correctamente (`draft` → `ready` cuando esté listo)
- [ ] `owner` actualizado con el handle de GitHub del responsable
- [ ] `order` refleja el orden en el hub

### Para PRs de infraestructura
- [ ] `npm run check` pasa en verde
- [ ] Cambio documentado si afecta el flujo del equipo
- [ ] `AGENTS.md` actualizado si cambia algún comando o ruta

## Screenshots / demo
<!-- Si aplica: capturas de pantalla del hub o la sección -->

## Notas para el reviewer
<!-- Contexto adicional, decisiones de diseño, riesgos -->
