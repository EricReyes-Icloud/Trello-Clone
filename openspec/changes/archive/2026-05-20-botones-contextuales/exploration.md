# Exploración: Botones Contextuales

## Resumen Ejecutivo

El sistema actual de botones y acciones en Taskflow es funcional pero lacks una jerarquía visual clara y retroalimentación al usuario. Los principales problemas son: botones de eliminación siempre visibles con riesgo de clic accidental, falta de una barra de herramientas contextual para tarjetas, confirmaciones con `confirm()` nativo que rompen la experiencia visual,y ausencia de jerarquía en los botones.

## Estado Actual

### Card Component (`src/components/cards/card.jsx`)
- **Estructura de botones**: Botón "Eliminar" (linea 106-108) visible solo en hover con efecto de opacidad
- **Eventos principales**: 
  - `onClick` en el div principal activa modo edición (linea 71)
  - `deleteCard` detiene propagación para evitar activar edición (linea 63)
- **Accesibilidad**: Atributos aria-label implementados
- **Modo edición**: Botones "Guardar" y "Cancelar" aparecen temporalmente

### List Component (`src/components/lists/list.jsx`)
- **Botón de eliminación**: Siempre visible a la derecha del título (lineas 105-111)
- **Confirmación**: Usa `confirm()` nativo (linea 59) - problema principal de UX
- **Eventos de acceso**: Título editable al click (linea 101), botón añadir tarjeta (linea 137-143)
- **Manejo de estado**: Estados separados para edición de título y añadir tarjeta

### Board Component (`src/components/board/board.jsx`)
- **Botón principal**: "Añadir lista" en el extremo derecho (lineas 63-69)
- **Sin atajos de teclado**: No hay implementación para Ctrl+L u otros atajos

### CSS Analysis (`src/App.css`)
- **Botones existentes**:
  - `.btn-list-delete` (linea 91-107): Rojo en hover, siempre visible
  - `.card-delete` (linea 205-227): Oculto por defecto, visible en hover
  - `.btn-add` y `.btn-add-list` (linea 275-316): Estilos similares pero sin diferenciación
- **Jerarquía limitada**: Solo dos variantes (transparent vs hover)
- **Sin clases de danger/primary/secondary explícitas**

### Context API & Reducer
- **Estructura robusta**: Acciones bien definidas para CRUD
- **Sin historial**: No hay implementación de undo/redo
- **Retroalimentación**: Solo success animation en edición de tarjeta

## Áreas Afectadas

- `src/components/cards/card.jsx` - Añadir toolbar contextual, mejorar botón eliminar
- `src/components/lists/list.jsx` - Reemplazar confirm() con toast/undo
- `src/components/board/board.jsx` - añadir atajo Ctrl+L
- `src/App.css` - definir clases de botones hierarquizadas
- Nuevo componente necesario: Toast notification para undo

## Enfoques

### 1. **Enfoque Componente Centralizado**
- Crear componentes reutilizables: `<ContextMenu>`, `<Toast>`
- Ventajas: Consistencia, reutilización
- Complejidad: Media
- Tiempo: 2-3 sesiones

### 2. **Enfoque Mejora Incremental**
- Modificar componentes existentes sin crear nuevos
- Ventajas: Rápido, cambios mínimos
- Complejidad: Baja
- Tiempo: 1-2 sesiones

### 3. **Enfoque Refactor Completo**
- Rediseñar arquitectura de interacciones
- Ventajas: Mejor experiencia a largo plazo
- Complejidad: Alta
- Tiempo: 4-5 sesiones

## Descubrimientos Clave

1. **Event bubbling controlado**: El código ya usa `e.stopPropagation()` correctamente
2. **Sistema de retroalimentación existente**: Success animation en edición de tarjeta (clase `.feedback-success`)
3. **Sin precedentes**: No hay modals, toasts o menús contextuales en el códigobase actual
4. **Estado centralizado robusto**: BoardReducer soportaría fácilmente acciones de undo

## Riesgos

1. **Sin componentes base**: Crear toast/modal desde cero puede dar inconsistencias visuales
2. **Conflicto con hover**: Botón de eliminación de tarjeta usa hover reveal - puede interferir con nuevo toolbar
3. **Control de foco**: Los inputs actualmente usan autoFocus - debe coordinarse con nuevos menús contextuales
4. **Testing limitado**: No hay pruebas existentes para validar interacciones complejas

## Recomendación

Implementar **Enfoque 2 (Mejora Incremental)** con una pequeña creación de componente Toast:

- Mínima disrupción al código existente
- Aprovecha el patrón de animación `.feedback-success` ya existente
- Implementa undo con `setTimeout()` y estado temporal en el reducer
- Añade clases CSS para jerarquía de botones sin romper estilos existentes

Este enfoque equilibra velocidad de implementación con mejoras significativas de UX, preparando el camino para futuros refinamientos.

## Listo para Propuesta

**Sí** - El análisis completo del estado actual proporciona suficiente contexto para crear una propuesta detallada que priorice los problemas confirmados existentes sin sobre-ingeniería.