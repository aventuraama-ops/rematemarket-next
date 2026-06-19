# Control de Cambios (Changelog) - Remate Market

Todas las actualizaciones notables del proyecto se registrarán en este archivo.

## [Unreleased / Fase 2 en progreso] - Junio 2026

### Añadido
- **InsForge Backend:** Tabla `productos` migrada a InsForge con 30 columnas, incluyendo soporte para precios escalonados (vol1, vol2, vol3) y especificaciones técnicas.
- **Indexación:** Índice único en `sku` (`productos_sku_idx`) para permitir importaciones masivas limpias usando `ON CONFLICT DO UPDATE`.
- **Nuevos Productos:** Se realizó un *bulk upsert* exitoso de 27 productos reales (fajas, licores, motos, cascos, sandalias) desde el catálogo oficial en CSV.
- **Mock de Productos:** Se actualizó `src/infrastructure/mock/productos.ts` para que coincida exactamente con la data en InsForge (ej. "Faja Form X" con tabla de medidas y pesos detallados).
- **Roadmap & Auditoría:** Se generó el documento de auditoría del embudo de ventas, definiendo la prioridad urgente de crear Páginas de Detalle de Producto (PDP) en `/producto/[slug]`.

### Modificado
- **Página de Sorteo (`/sorteo/page.tsx`):** Rediseño visual completo de *Dark Mode* a *Light Mode*. Se corrigieron los problemas de contraste causados por el cambio del layout base, adaptando los textos principales a `text-ink`, tarjetas a `bg-gray-50` con bordes naranja, y optimizando la legibilidad general.
- **Página de Producto (PDP):** Se corrigió un error de React (TypeError) al renderizar los precios por volumen. Se actualizó la propiedad del frontend `precioUnitario`, `precioDocena` y `precioCajon` en lugar de las variables de base de datos directas (`vol1_precio`).
- **Embudo de Ventas (Catálogo):** Se modificó la arquitectura de navegación. Las tarjetas de categorías en el Home y `/categorias` ahora redirigen al Hub Central `/carrito?categoria=[slug]`. La página `/carrito` fue actualizada para pre-filtrar automáticamente la tabla de productos leyendo la URL.
- **Botones de Acción (FOMO):** Los botones "Añadir al pedido" en la vista `/remate-del-mes` ahora añaden los ítems directamente al estado global del carrito en lugar de redirigir a la PDP, acelerando la conversión.

### Planificado (Próximos Pasos Inmediatos)
- [ ] Implementar la sección de "Últimos productos en stock" y "Tendencia" en la página `/remate-del-mes`.
- [ ] Construir la arquitectura base de las Páginas Individuales de Producto (PDP) en `src/app/(main)/producto/[slug]/page.tsx` con soporte SEO.
- [ ] Sustituir la lógica de búsqueda en frontend (`useMemo` en el carrito) por consultas al backend (InsForge) para soportar paginación en catálogos extensos.
