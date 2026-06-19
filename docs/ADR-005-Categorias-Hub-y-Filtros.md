# ADR 005: Enrutamiento de Categorías y Catálogo Centralizado (Hub)

## Contexto
Durante el rediseño del embudo de ventas, se observó que la navegación hacia categorías específicas redirigía al usuario a subpáginas individuales (ej. `/categorias/calzados`). Esto dividía el flujo de compra y forzaba al usuario a navegar por múltiples subpáginas aisladas en lugar de poder visualizar todo el catálogo y sus filtros en un solo lugar.

## Decisión
1. **Catálogo Maestro como Hub Central:** Todas las acciones de navegación por categorías desde el *Home* o la página de `/categorias` ya no abrirán rutas anidadas. En su lugar, redirigirán al catálogo principal: `/carrito?categoria=[slug]`.
2. **Pre-filtrado por URL:** La página del catálogo (`/carrito/page.tsx`) utilizará `useSearchParams` para capturar el parámetro `categoria` y aplicarlo como estado inicial del filtro (`categoriaSlug`).
3. **Acciones Directas (FOMO):** Las tarjetas de producto en secciones de "Urgencia" o "Remate del Mes" permitirán añadir directamente al carrito en lugar de redirigir a la página individual (PDP), acortando el embudo de conversión para compras impulsivas.

## Consecuencias
- **Positivas:** 
  - Se unifica la experiencia de compra en una sola página poderosa (el catálogo/cotizador).
  - El usuario puede cambiar de categoría rápidamente usando la barra lateral de filtros sin recargar subpáginas.
  - Se reduce la fricción para añadir productos en oferta directa al carrito.
- **Riesgos:** La página `/carrito` se vuelve pesada en lógica de filtrado. Al transicionar a InsForge (backend real), se requerirá paginación y filtrado Server-Side para evitar saturar el cliente si el catálogo crece a miles de productos.
