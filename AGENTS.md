# AGENTS.md

## Comandos

```bash
npm run dev      # Iniciar el servidor de desarrollo
npm run build    # Compilación de producción
npm run lint     # Ejecutar ESLint
npm run preview  # Vista previa de la compilación de producción
```

## Estructura

- `src/components/` — Componentes de interfaz de usuario: tablero, lista y tarjeta
- `src/context/` — Contexto de React para el estado del tablero
- `src/reducers/` — Reductor al estilo Redux para la gestión del estado
- `src/hooks/` — Hooks personalizados (useAnimation, useBoard)
- Punto de entrada: `src/main.jsx` → `src/App.jsx`

## Lo que le falta a este proyecto

- **No hay pruebas** — no hay marco de pruebas, ni archivos de pruebas, ni comandos de pruebas
- **No hay CI** — no hay GitHub Actions ni otra automatización
- **No hay TypeScript** — JavaScript puro con JSX

## Notas

- Utiliza React 19 + Vite 8
- La configuración de ESLint utiliza un formato de configuración plano
- El resultado de la compilación se guarda en `dist/`

