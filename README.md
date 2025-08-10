# TITA 🥑 — Tu compañera para aprender y construir en Web3

TITA es una app cálida y amigable que guía a nuevos builders de Web3 con un flujo de onboarding, recomendaciones personalizadas y un panel de progreso con motivación. Este MVP funciona como prototipo sin conexión a blockchain, preparado para futuras integraciones con Stellar.

## Flujo del usuario
1. Pantalla de bienvenida → botón “Comenzar”.
2. Onboarding (4 pasos): objetivo, nivel, tiempo disponible y área de interés.
3. Recomendaciones: 3 recursos sugeridos según tus respuestas.
4. Panel de progreso: marca tareas, observa tu avance y desbloquea el “TITA Builder Badge” al 100%.
5. Botón “Me siento perdido” para recibir una frase motivadora aleatoria.

## Datos locales incluidos
- Recursos Web3 (10) en `src/data/resources.ts`.
- Frases motivadoras (5) en `src/data/motivations.ts`.

## Persistencia
- Las respuestas del onboarding y el progreso se guardan en `localStorage` vía `src/lib/storage.ts`.
- Listo para conectar a Supabase en el futuro (ver sección Stellar / Backend).

## Estilo visual
- Tema “palta”: verdes y amarillos cálidos, tipografía redondeada (Quicksand), bordes suaves, animaciones sutiles.
- Mascota TITA y badge generados en `src/assets/`.

## Ejecutar el proyecto
Requisitos: Node.js y npm.

```bash
npm i
npm run dev
```

La app corre en http://localhost:8080

## Estructura relevante
- `src/pages/Index.tsx`: Bienvenida.
- `src/pages/Onboarding.tsx`: Flujo por pasos.
- `src/pages/Recommendations.tsx`: Recomendaciones + progreso.
- `src/components/TitaMascot.tsx`: Mascota TITA.
- `src/components/ui/*`: Componentes shadcn-ui.
- `src/index.css` y `tailwind.config.ts`: Sistema de diseño y animaciones.

## Futuro: integración con Stellar (sin implementar en este MVP)
Este prototipo deja la lógica preparada para:
- Autenticación y guardado de progreso en Supabase (recomendado). Una vez conectado, reemplazar/combinar `localStorage` por tablas con RLS (p.ej. `profiles`, `progress`).
- Emisión on-chain del “TITA Builder Badge” en Stellar/Soroban.
  - Edge function: validar progreso 100% y solicitar la creación del badge (cuenta del proyecto), devolviendo tx hash.
  - Actualizar la UI para mostrar estado de la transacción y verificar en el explorador.

> Nota: Para activar la integración nativa con Supabase en Lovable, usa el botón verde “Supabase” en la esquina superior derecha del editor.

## SEO
- Títulos y descripciones por página con `document.title` y meta description.
- Semántica accesible, imágenes con `alt`, y animaciones suaves.
