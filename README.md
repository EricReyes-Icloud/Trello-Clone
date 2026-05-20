<div align="center">

<img src="./imgs/Miniatura oficial trello clone.png" />

## Taskflow — Trello Clone


<p>
Aplicación de gestión visual de tareas inspirada en Trello, enfocada en arquitectura frontend escalable, manejo de estado complejo e interfaces altamente interactivas para flujos de trabajo modernos.
</p>

</div>

---

## Descripción

Taskflow es una aplicación inspirada en Trello enfocada en la gestión visual de tareas mediante tableros, listas y tarjetas dinámicas.

El proyecto está siendo desarrollado con una arquitectura frontend moderna basada en React, priorizando la escalabilidad, la modularidad y una experiencia de usuario altamente interactiva.

Taskflow busca replicar patrones reales utilizados en aplicaciones SaaS modernas, implementando manejo de estado complejo, estructuras de datos anidadas y componentes reutilizables bajo una arquitectura limpia y mantenible.

---

## Problema que resuelve

La gestión de tareas suele convertirse en un problema cuando:

No existe una organización visual clara, las tareas crecen rápidamente, y los flujos de trabajo no son intuitivos.

Taskflow proporciona:

- Organización visual por listas.
- Administración flexible de tareas.
- Interacción rápida y dinámica.
- Una experiencia centrada en productividad y claridad visual.

El proyecto también funciona como una exploración técnica sobre cómo construir interfaces complejas y escalables similares a herramientas de productividad modernas.

---

## Stack Tecnológico

### Frontend

- React
- Vite
- JavaScript (ES6+)

### Manejo de Estado

- Context API
- useReducer

### Estilos y UI

- CSS modular
- Arquitectura basada en componentes

### Animaciones (planeado)

- GSAP

### Toolings

- Git
- GitHub
- OpenCode
- Ollama

### Futuro

- Firebase / Backend persistente
- Drag & Drop avanzado
- Testing automatizado

---

## Arquitectura

Taskflow sigue una arquitectura frontend modular orientada a escalabilidad y mantenibilidad.

### Principios utilizados

- Separación de responsabilidades.
- Flujo de datos unidireccional.
- Componentes reutilizables.
- Estado centralizado.
- Organización desacoplada entre UI y lógica.

### Gestión de estado.

El proyecto utiliza:

- Context API
- useReducer

Esto permite:

- Manejar estructuras anidadas complejas.
- Centralizar acciones.
- Mantener un flujo predecible.
- Facilitar futuras expansiones del proyecto.

---

## Estructura general del proyecto

```text
src/
│
├── components/        # Componentes reutilizables de UI
│   ├── board/
│   ├── lists/
│   └── cards/
│
├── context/           # Estado global y providers
│
├── reducers/          # Reducers centralizados
│
├── hooks/             # Custom hooks reutilizables
│
├── styles/            # Estilos globales/modulares
│
├── utils/             # Funciones auxiliares
│
├── App.jsx
└── main.jsx
```

---

## Testing (Futuro)

El proyecto planea incorporar testing automatizado para garantizar estabilidad y mantenibilidad a medida que la aplicación crezca.

### Posibles herramientas:

- Vitest
- React Testing Library

### Objetivos

- Testing de reducers.
- Testing de componentes.
- Validación de flujos críticos.
- Prevención de regresiones.

---

## Deployment (Futuro)

Taskflow será desplegado públicamente para simular un flujo de desarrollo real de producto.

### Posibles plataformas:

- Vercel
- Netlify

### Objetivos futuros

- CI/CD
- Variables de entorno
- Build optimizado
- Deploy automático desde GitHub

---

## Desarrollo asistido por IA

El desarrollo de Taskflow incorpora herramientas de inteligencia artificial como apoyo técnico y arquitectónico durante el proceso de construcción.

### La IA se utiliza como:

- Asistente de desarrollo,
- Apoyo para decisiones arquitectónicas,
- Revisión de buenas prácticas,
- Optimización de estructura,
- Aceleración de aprendizaje técnico.

### Sin embargo:

La planificación, toma de decisiones, organización del proyecto y comprensión de la arquitectura
son gestionadas activamente durante el desarrollo.

El objetivo no es depender de la IA para “generar código”, sino utilizarla como herramienta de productividad y aprendizaje estratégico dentro de un flujo profesional de desarrollo.

---

## Filosofía del proyecto

Taskflow no busca ser únicamente un clon visual de Trello.

El objetivo principal es construir una aplicación frontend moderna que:

- Escale correctamente.
- Mantenga una arquitectura limpia.
- Implemente buenas prácticas reales.
- Refleje patrones utilizados en productos SaaS profesionales.

### El proyecto prioriza:

- Claridad arquitectónica.
- Mantenibilidad.
- Experiencia de usuario.
- Evolución incremental del producto.

Cada nueva funcionalidad debe aportar valor técnico y mantener coherencia con la arquitectura general del sistema.

---

## Estado del proyecto

En desarrollo activo.

### Actualmente implementado

- Arquitectura base del proyecto
- Componentes Board / List / Card
- Estado global con Context API + useReducer
- CRUD inicial de listas y tarjetas
- Mejoras de UX en inputs y edición

### Planeado próximamente

- Drag & Drop
- Persistencia de datos
- Animaciones con GSAP
- Testing automatizado
- Deployment público
- Autenticación
- Tiempo real

## Autor

Desarrollado por <strong>Eric Reyes</strong>.

