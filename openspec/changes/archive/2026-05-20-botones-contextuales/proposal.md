# Proposal: Botones Contextuales

## Intent
Mejorar UX: botones contextuales jerarquizados, confirmaciones visuales (evitando clics accidentales) y consistencia.

## Scope
### En Scope
- Toolbar contextual tarjetas (Editar/Eliminar)
- Jerarquía botones (primario/secundario/peligro)
- Toast + undo en lugar de confirm() para listas
- Atajo Ctrl+L para agregar listas
- Componentes Toast y ContextualToolbar

### Fuera de Scope
- Drag & drop, persistencia, animaciones GSAP, auth
- Cambios estructura reducer

## Capabilities
### Nuevas
- `contextual-toolbar`: Acciones tarjeta
- `button-hierarchy`: Clases CSS .btn-*
- `undo-toast`: Notificaciones con deshacer
- `keyboard-shortcuts`: Ctrl+L agregar lista

### Modificadas
- `list-deletion`: De confirm() a toast+undo
- `card-actions`: Mejor descubrimiento acciones

## Enfoque
Incremental:
1. Toolbar siempre visible tarjetas (⋮)
2. Clases CSS jerarquizadas en App.css
3. Toast con mensaje + botón Deshacer (5s)
4. Listener Ctrl+L en Board
5. Reutilizar animación .feedback-success

## Áreas Afectadas
| Area | Impact | Description |
|------|--------|-------------|
| src/components/cards/card.jsx | Modified | Añadir toolbar contextual |
| src/components/lists/list.jsx | Modified | Reemplazar confirm() con toast+undo |
| src/components/board/board.jsx | Modified | Atajo Ctrl+L |
| src/App.css | Modified | Clases .btn-primary/.btn-secondary/.btn-danger |
| src/components/ui/Toast.jsx | New | Sistema notificaciones |
| src/components/ui/ContextualToolbar.jsx | New | Toolbar reutilizable |

## Riesgos
| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Inconsistencia visual | Media | Patrones y variables CSS existentes |
| Conflicto toolbar vs hover | Baja | Ambos: toolbar descubrimiento, hover acceso rápido |
| Problemas foco | Media | Respetar tab order existente |
| Estado undo complejo | Baja | Estado temporal reducer con clearTimeout |

## Plan de Rollback
1. Revertir card.jsx (sin toolbar)
2. Restaurar confirm() en list.jsx
3. Eliminar Toast.jsx y ContextualToolbar.jsx
4. Quitar clases App.css
5. Remover listener Ctrl+L board.jsx
6. Limpiar acciones reducer si se añadieron

## Dependencies
Ninguna externa. Reutiliza Context API y reducer.

## Criterios de Éxito
- [ ] Toolbar visible constantemente para acciones tarjeta
- [ ] Eliminación lista muestra toast con deshacer
- [ ] Botones jerarquía visual clara
- [ ] Atajo Ctrl+L funciona globalmente
- [ ] Sin regresiones edición/creación existente