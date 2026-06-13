# ADR-002: Floating Action Buttons and Navbar Social Media Color Handling

**Date:** 2026-06-13  
**Status:** Accepted  

## Context
1. The project required integrating floating action buttons (Scroll to Top and WhatsApp) globally across all views (e-commerce storefront and promotional landing pages).
2. The initial state of the transparent `Navbar` overlays dark backgrounds (such as the main landing Hero component or Sorteo theme). This rendered dark-themed elements (like the default black TikTok icon or un-hovered grey social icons) completely invisible or hard to see at startup.

## Decisions

### 1. Global Component Mounting via Root Layout
We integrated the `<FloatingActions />` client component globally inside `src/app/layout.tsx` within the global `CartStoreProvider`.
* **Why:** This ensures the WhatsApp contact button and scroll-to-top feature are uniformly accessible across every page route (main store, checkout flow, categories, or custom landings) without duplicating layouts or components.

### 2. RSC Compatibility (Use Client Directive)
We added `"use client";` to the top of `src/components/shared/FloatingActions.tsx`.
* **Why:** The component depends on React hooks (`useState` and `useEffect`) for listening to window scroll events. Since Next.js App Router defaults to Server Components, any component using client-side hooks must be explicitly marked.

### 3. Adaptive & High-Contrast Branded Social Icons
Instead of using generic dimmed icons at the startup state (`!scrolled`), we conditionalized the CSS classes in `src/components/layout/Navbar.tsx` based on the `scrolled` state:
* **Branded Colors initially:** YouTube (`#FF0000`), Instagram (`#E1306C`), and Facebook (`#1877F2`) load with their brand colors immediately.
* **TikTok High Contrast:** Since TikTok's brand color is black (or white depending on background), we enforce `text-white` when not scrolled to ensure readability against the initial dark Hero component.
* **Post-Scroll Dimming:** Once the user scrolls past the threshold (`scrolled === true`) and the navbar background becomes white/light, all icons fade to standard `text-foreground/60` and restore their branded hover behaviors.

## Consequences
* Enhanced visual quality and accessibility from the moment the user opens the page.
* Fully documented global component architecture, maintaining clean separation of concerns and Next.js compliance.
