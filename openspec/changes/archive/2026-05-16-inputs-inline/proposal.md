# SDD Proposal: inputs-inline

## Change Name

`inputs-inline`

## Intent

Mejorar la experiencia de edición inline de cards y listas en el tablero Trello, reemplazando el comportamiento actual (input simple, blur guarda, sin feedback) por una edición profesional con textarea, guardado explícito y feedback visual.

## Scope

Únicamente los 4 modos de edición/creación existentes:
1. Card edit (click en card → editar texto)
2. List title edit (click en título → renombrar)
3. Add card input (botón + → crear card)
4. Add list input (botón + → crear lista)

## Approach

### A. Card Edit → Textarea con auto-resize
- Reemplazar `<input type="text">` por `<textarea>` que crezca automáticamente con el contenido (scrollHeight)
- Enter = nueva línea (comportamiento nativo de textarea)
- Ctrl+Enter = guardar
- Botón "Guardar" (primario) + botón "Cancelar" (secundario) visibles debajo del textarea
- Escape cancela y cierra
- Click fuera cancela (NO guarda automáticamente)
- Brief success feedback: el borde del textarea se pone verde fugaz (0.5s) al guardar

### B. List Title Edit
- Click en título → input con texto seleccionado automáticamente (select all)
- Enter guarda, Escape cancela, blur cancela (NO guarda)
- Mantener input simple (una línea) porque es un título
- Mantener ✕ para eliminar siempre visible

### C. Add Card Input
- Se mantiene como input simple (una línea) — crear cards nuevas no necesita textarea
- Enter crea la card, Escape cancela
- blur cierra sin crear si está vacío (comportamiento actual, funciona bien)
- Pequeña mejora: focus visible más claro

### D. Add List Input
- Se mantiene igual (input simple, una línea)
- Enter crea, Escape cancela
- blur cierra sin crear si está vacío

## Files Affected

- `src/components/cards/card.jsx` — refactor edit mode con textarea + botones
- `src/components/lists/list.jsx` — select all on title edit, blur=cancel
- `src/App.css` — estilos nuevos para textarea, save/cancel buttons, success feedback

## Risks

- El auto-resize de textarea requiere manejar scrollHeight en cada onChange — baja complejidad
- Ctrl+Enter debe prevenir que el Enter normal dispare el submit — simple, es un e.preventDefault()
- El click-outside cancel (no save) podría ser frustrante si el usuario esperaba auto-save — mitigado con botones visibles

## Out of Scope (para próximas fases)

- Botones contextuales (Fase 2)
- Estados visuales hover/active/focus-visible (Fase 3)
- Validaciones visuales con feedback de error (Fase 4)
- Empty states
- useClickOutside hook genérico
- Menú contextual de tres puntos
- Reemplazo de confirm() por modal/undo toast
