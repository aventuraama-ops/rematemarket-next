# ADR 003: Estrategia de Despliegue en Cloudflare Pages

## Contexto
El proyecto Remate Market fue migrado a Next.js App Router y se eligió Cloudflare Pages como plataforma de hosting debido a su CDN global y capa Edge gratuita. Sin embargo, al usar el adaptador `@cloudflare/next-on-pages`, surgieron múltiples conflictos de compatibilidad entre la arquitectura de servidor tradicional de Next.js y las restricciones del entorno Serverless/Edge de Cloudflare (Plan Gratuito).

## Decisiones

1. **Uso de `.vercel/output/static` como directorio de salida:**
   - **Por qué:** Cloudflare emula el estándar de Vercel (Build Output API) para empaquetar proyectos Next.js. Configurar el directorio manual `.next` arroja un error 404 porque los estáticos finales se generan en la carpeta de Vercel emulada.

2. **Evitar el Global Edge Runtime (`export const runtime = 'edge'` en layout raíz):**
   - **Por qué:** Cloudflare Pages en su plan gratuito tiene un límite de tamaño de **3 MiB** por función Worker. Al forzar el runtime global, Next.js empaquetó todo el código (Rutas, React, Tailwind, InsForge) en un único `_worker.js` de 20MB, bloqueando el despliegue.
   - **Alternativa aplicada:** Se dejó el runtime por defecto (estático) y se optó por la pre-renderización.

3. **Uso de `generateStaticParams` para Rutas Dinámicas:**
   - **Por qué:** La ruta de catálogo `/categorias/[slug]` requería evaluación dinámica por defecto, forzando a Cloudflare a crear una función Serverless que excedía el límite de 3MB.
   - **Solución:** Se implementó `generateStaticParams` extrayendo los slugs del origen de datos y convirtiendo la ruta a un Server Component asíncrono. Esto permitió que Next.js compile la aplicación entera en archivos HTML 100% estáticos en tiempo de build, esquivando completamente los límites del Worker de Cloudflare.

4. **Habilitar el flag `nodejs_compat`:**
   - **Por qué:** Next.js bajo Cloudflare Pages requiere ciertos módulos internos de Node.js (`node:buffer`, `node:async_hooks`). Se activó esta bandera en la configuración de *Compatibility Flags* del panel de Cloudflare (Production y Preview) para prevenir errores `503 Service Unavailable` en tiempo de ejecución.

## Consecuencias
- **Positivas:** El despliegue es 100% compatible con la capa gratuita de Cloudflare. Al ser contenido completamente pre-renderizado (SSG), los tiempos de carga son instantáneos (TTFB < 50ms) y el consumo de recursos de computación es cero.
- **Negativas:** Cualquier actualización en el catálogo base de categorías requiere un nuevo despliegue en Cloudflare para generar el nuevo HTML estático (hasta que se implemente ISR).

## Notas para el Agente Backend (InsForge)
Cuando se conecte la base de datos real de InsForge en la Fase 2, la función `generateStaticParams` en `src/app/(main)/categorias/[slug]/page.tsx` deberá ser modificada para hacer un query a la base de datos y obtener los slugs reales, manteniendo la naturaleza estática o utilizando Invalidate (ISR) de Cloudflare para purgar el caché sin reconstruir toda la app.
