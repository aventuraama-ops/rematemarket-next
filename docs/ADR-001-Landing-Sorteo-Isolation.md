# ADR-001: Landing Sorteo Isolation and CSS Cascade Layer Resolution

**Date:** 2026-06-09
**Status:** Accepted

## Context
The project required implementing a high-fidelity promotional landing page (`/sorteo`) provided as an isolated HTML/CSS manual. The challenge was integrating this highly customized, dark-themed UI into a Next.js App Router project that uses Tailwind CSS v4 globally for the main e-commerce storefront (`Remate Market`), without causing CSS class collisions or breaking the global UI structure (such as the standard `Navbar`).

## Decisions

### 1. Route Grouping & Layout Isolation (Actualizado)
Inicialmente, se decidió colocar la página Sorteo dentro de `src/app/(landing)/sorteo` con su propio `layout.tsx` que incluía etiquetas `<html>` y `<body>`. 
**Actualización (Fix de Performance):** Dado que tener múltiples layouts raíz causaba que Next.js forzara una recarga completa de la página (hard reload) al navegar entre la tienda y el sorteo, se unificaron las etiquetas `<html>` y `<body>` en un único archivo `src/app/layout.tsx`. La página de Sorteo ahora se aísla envolviendo sus componentes en un simple `<div className="dark ds-page-container">`, manteniendo la compatibilidad de estilos oscuros y garantizando una navegación SPA (Soft Navigation) instantánea.

### 2. Prefix-Based CSS Scoping
Instead of relying purely on Tailwind, we imported the raw `sorteo.css` file. However, to prevent styles from bleeding into global components (like the Navbar or Cart), we scoped all raw CSS rules inside a specific container class `.ds-page-container`.
- **Why:** The Sorteo manual heavily relied on tag selectors (like `body`, `h1`, `p`). Scoping them within `.ds-page-container` neutralized global pollution while maintaining the original 1:1 design inside the layout.

### 3. Removal of Raw CSS Resets (The Tailwind Layer Conflict)
We removed the universal reset `* { margin: 0; padding: 0; }` from the raw `sorteo.css` file.
- **Why:** Tailwind CSS v4 utilizes native CSS Cascade Layers (`@layer base, utilities`). According to standard browser behavior, any unlayered CSS rule strictly overrides layered CSS utilities regardless of specificity. The raw reset in `sorteo.css` was unlayered, meaning it was overriding critical Tailwind utility classes globally (e.g., stripping the paddings from `.container-rm` and nullifying margins like `mb-20`). Removing the raw reset allowed Tailwind's preflight layer and utility layer to correctly render responsive margins and padding blocks across the app.

### 4. Responsiveness with Tailwind (Mobile-First Override)
We replaced the inline flex-box inline styles (`display: flex`) from the manual with Tailwind's breakpoint-driven utilities (e.g., `flex-col lg:flex-row`).
- **Why:** The manual provided a rigid desktop-only structure. Using Tailwind classes provided immediate mobile adaptation out-of-the-box (collapsing horizontal steps into vertical columns and adapting icon logic conditionally via `hidden lg:block`).

## Consequences
- The Sorteo page looks exactly like the high-fidelity mockups, perfectly integrates with the real `Navbar` and global `CartStoreProvider`, and cleanly supports dark mode.
- Future custom promotional pages must be aware that raw CSS imports without layer specifications can and will destroy Tailwind's global utility rules. All future legacy CSS should be manually wrapped in `@layer` or scrubbed of wildcard selectors.
