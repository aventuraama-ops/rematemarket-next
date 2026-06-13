# Control de Logs de Migración: Vite a Next.js App Router

Este documento sirve como bitácora y registro de todas las decisiones, cambios de componentes y errores resueltos durante el proceso de migración de Remate Market.

## [2026-06-09] - Migración Core y Vistas Principales

### Cambios de Arquitectura
- **Estado Global:** Se ha movido de un hook puro (`use-cart`) a Zustand puro con React Context (`src/providers/store-provider.tsx` y `src/stores/cart-store.ts`).
- **Navegación:** Sustitución completa de `@tanstack/react-router` por `next/link` y `next/navigation` en los componentes.

### Páginas Migradas
- **`/carrito`**: 
  - Archivos creados: `src/app/carrito/page.tsx` y `src/app/carrito/layout.tsx`.
  - Características: Grid renderizado en cliente y filtrado dinámico local vía Zustand. 
  - Implementación de _Barra Flotante_ del carrito que reacciona a los cambios en el global state.
- **`/cotizar`**:
  - Archivos creados: `src/app/cotizar/page.tsx` y `src/app/cotizar/layout.tsx`.
  - Características: Flujo _Wizard_ de 4 pasos (Resumen de carrito, Contacto, Entrega, Resumen y WhatsApp).

### Solución de Errores Críticos (Bugs & Hydration)
- **Error 500 (lucide-react):** Los imports directos de iconos sociales (Facebook, Instagram, Youtube, TikTok) no existen en `lucide-react`. Se solucionó implementando SVGs personalizados embebidos en el componente `Navbar`.
- **Hydration Mismatch:** El componente `CTA.tsx` anidaba un `motion.button` dentro de un `<Link>` de Next.js que causaba error del DOM (`<a>` cannot appear as a descendant of `<a>`). Solucionado utilizando `motion.create(Link)` y delegando el href condicionalmente.
- **Refactoring CartSheet:** Se eliminó el componente `CartSheet.tsx` que abría un Drawer. La nueva lógica exige que toda la navegación del carrito redirija obligatoriamente a `/carrito` y `/cotizar` para maximizar el SEO y mantener limpia la UI mobile.
- **Migración y Estilización CSS (Tailwind v4):** Se corrigió la falta de estilos (elementos en blanco y sin contraste) sustituyendo reglas exclusivas de Vite (`@import "tailwindcss" source(none);` y `@source`) que bloqueaban la compilación de Turbopack en Next.js por la regla oficial `@import "tailwindcss";`. Además, se requirió instalar explícitamente la librería `tw-animate-css` para resolver el error 500 durante la migración de `styles.css` a `globals.css`.
- **Next.js Hard Navigation entre Route Groups:** Al tener múltiples `layout.tsx` raíz (uno para `(main)` y otro para `(landing)/sorteo`), Next.js realizaba recargas completas de página (hard reloads). Se solucionó unificando el `<html>` y `<body>` en un único `src/app/layout.tsx` global para restaurar la navegación SPA instantánea.
- **Tipado TS del Catálogo B2B:** Se corrigió el mapeo de tipos en `ProductB2BCard.tsx` para coincidir con la entidad real del dominio (usando `product.imagenes` en vez de `imageUrl`, y añadiendo fallbacks de cálculo de volumen cuando `precioDocena` o `precioCajon` son indefinidos).

## [2026-06-13] - Botones Flotantes e Iconos de Redes Sociales

### Cambios de Arquitectura
- **Componentes Globales:** Integración del componente cliente `<FloatingActions />` (`src/components/shared/FloatingActions.tsx`) en el Layout raíz (`src/app/layout.tsx`) para habilitar globalmente los accesos directos flotantes (WhatsApp y Scroll to Top).

### Solución de Errores e Integraciones Visuales
- **Error de RSC (use client):** Se corrigió el error de importación de hooks (`useEffect`, `useState`) en el layout del servidor Next.js agregando la directiva `"use client"` al componente `FloatingActions.tsx`.
- **Visibilidad de Iconos Sociales (Navbar):** Se ajustaron los estilos condicionales en `Navbar.tsx` para que los iconos de YouTube, Instagram y Facebook carguen inicialmente con sus colores de marca, y TikTok en blanco (para contraste sobre el Hero oscuro), regresando a la atenuación estándar (`text-foreground/60`) al realizar scroll vertical.

### Próximos pasos (Fase 2 - Datos y Contenido)
1. Inserción de la base de datos de productos reales (via Excel/CSV o BD).
2. Refinamiento de la lógica de negocio usando la data real.
3. Integración de páginas restantes por el lado del cliente y servidor.

