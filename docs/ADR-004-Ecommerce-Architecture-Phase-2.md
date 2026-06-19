# ADR 004: Arquitectura del Catálogo y Fase 2 del Ecommerce

## Contexto
Durante la Fase 1, el catálogo de productos se manejaba mediante datos de prueba (mocks) en el frontend. Para la Fase 2, se requiere conectar el aplicativo al backend definitivo (InsForge) y preparar la base de datos para soportar un modelo B2B y B2C híbrido, con precios escalonados por volumen y especificaciones técnicas detalladas.

## Decisiones

1. **Tabla Única de Productos (JSON flexible vs. Normalización estricta):**
   - **Por qué:** Los productos varían drásticamente en sus características (ej. licores vs. fajas moldeadoras vs. motocicletas). Una estructura rígidamente normalizada requeriría demasiadas tablas anexas (EAV) que complican las consultas en el Edge.
   - **Solución:** Se creó una tabla `productos` con columnas base fuertemente tipadas (SKU, nombre, categoría, precio_unitario, stock) y se añadieron columnas específicas para precios escalonados (`vol1_etiqueta`, `vol1_precio`, etc.). Las especificaciones complejas se manejan a nivel de columnas de texto o pueden pasarse a JSONB en el futuro sin romper la estructura actual.

2. **Indexación por SKU:**
   - **Por qué:** La migración masiva de datos (bulk upsert) desde los archivos base en Excel/CSV requiere un identificador único, inmutable y entendible por el negocio.
   - **Solución:** Se creó un índice `UNIQUE` en la columna `sku` (`productos_sku_idx`). Esto permite usar `ON CONFLICT (sku) DO UPDATE` en las consultas de InsForge, garantizando que el catálogo se mantenga sincronizado sin duplicar filas.

3. **Arquitectura de URLs SEO (Slugs dinámicos):**
   - **Por qué:** Actualmente, el flujo envía al usuario directamente de la tarjeta de catálogo al modal de carrito. Esto destruye el SEO, ya que no hay páginas indexables por producto.
   - **Solución aprobada para Roadmap:** Se generará una arquitectura `/producto/[slug]` donde el `slug` se genera automáticamente a partir del nombre del producto y se almacena en la tabla. Estas páginas se pre-renderizarán en el servidor (SSG/ISR) consumiendo InsForge en el build-time.

4. **Desacople del Carrito (Zustand) y el Catálogo (InsForge):**
   - **Por qué:** El carrito de compras necesita reaccionar instantáneamente en el cliente, mientras que el catálogo puede ser pre-renderizado.
   - **Solución:** El frontend obtiene los productos del servidor, pero al hacer clic en "Agregar", los datos esenciales (ID, nombre, imagen, precio aplicable según volumen, y cantidad) se copian al *store* de Zustand (`useCartStore`). El carrito no hace refetches de precios mientras está en sesión (a menos que se implemente una validación en tiempo de checkout).

## Consecuencias
- **Positivas:** Migraciones de datos extremadamente rápidas desde CSV. La tabla única permite consultas simples y eficientes (`SELECT * FROM productos`).
- **Riesgos:** Si la estructura de precios por volumen supera los 3 niveles predefinidos (`vol1`, `vol2`, `vol3`), se deberá migrar ese modelo de datos a JSONB o una tabla relacional secundaria. Por ahora, cubre el 100% de los casos de uso definidos por el negocio.
