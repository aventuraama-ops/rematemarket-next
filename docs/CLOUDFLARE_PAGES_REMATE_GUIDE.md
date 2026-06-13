# Guía Paso a Paso para Despliegue Final: rematemarket.pe en Cloudflare Pages

Esta guía rápida te guiará sobre qué hacer exactamente una vez que tu jefe confirme la verificación del dominio en `punto.pe`.

---

## 📋 Resumen del Proceso

| Orden | Acción | ¿Quién / Cómo? | Estado |
| :--- | :--- | :--- | :--- |
| **1** | Validar correo de verificación de `punto.pe` | ❌ **Tu Jefe** (él debe hacer clic en el enlace) | Pendiente ⏳ |
| **2** | Activación de DNS de `rematemarket.pe` | ✅ **Automático** (Cloudflare detectará los nameservers activos) | En espera |
| **3** | Importar repositorio `aventuraama-ops/rematemarket-next` | ❌ **Tú** (en Workers & Pages) | Listo para hacer |
| **4** | Compilación y Generación de URL temporal | ✅ **Automático** (Cloudflare Pages descarga y compila) | En espera |
| **5** | Asignar dominio personalizado `rematemarket.pe` | ❌ **Tú** (en la pestaña Domains del proyecto) | En espera |

---

## 🚀 Paso a Paso de Ejecución (Cuando tu Jefe te dé luz verde)

### Paso 1: Conectar el Repositorio de GitHub
1. Inicia sesión en tu cuenta de [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Ve al menú lateral izquierdo y selecciona **Workers & Pages**.
3. Haz clic en el botón **Create Application** y luego selecciona la pestaña **Pages**.
4. Selecciona **Connect to Git** e inicia sesión con tu cuenta de GitHub.
5. Selecciona la organización `aventuraama-ops` y el repositorio `rematemarket-next`.

---

### Paso 2: Configurar Variables de Entorno (Claves de InsForge)
Antes de construir el proyecto, debes indicarle a Cloudflare dónde está tu base de datos para evitar que falle el build o el frontend quede inoperativo:
1. En la pantalla de configuración del build, expande la sección **Environment variables (advanced)**.
2. Agrega las siguientes tres variables (usando los valores reales provistos):
   * **Variable 1:**
     * **Name:** `NEXT_PUBLIC_INSFORGE_URL`
     * **Value:** `https://w6bsdjcw.us-east.insforge.app`
   * **Variable 2:**
     * **Name:** `NEXT_PUBLIC_INSFORGE_ANON_KEY`
     * **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNzc1ODB9.a8cyMyeo_KIrE6JfDW9K7cnQiMVtdcFRKWII4J8jLUM`
   * **Variable 3:**
     * **Name:** `INSFORGE_API_KEY`
     * **Value:** `ik_223c74a9b9f7c42fcb30c45ebed07796`

---

### Paso 3: Configurar el Build de Next.js
Configura los parámetros del framework en Cloudflare Pages:
1. **Framework preset:** Selecciona `Next.js` (si compilas con serverless/SSR mediante el plugin de Cloudflare) o configúralo en blanco si es static export.
2. **Build command:** `npm run build` o `bun run build`.
3. **Build directory:** `.next` (o `out` si has configurado static export en tu `next.config.ts`).
4. Haz clic en **Save and Deploy**. 
5. Cloudflare procesará el build y te entregará una URL temporal funcional terminada en `*.pages.dev`.

---

### Paso 4: Vincular el Dominio `rematemarket.pe`
Una vez que el build inicial sea exitoso y el dominio `rematemarket.pe` aparezca como **Active** en tu cuenta de Cloudflare:
1. Entra a tu proyecto en **Workers & Pages** > **rematemarket-next**.
2. Ve a la pestaña **Custom Domains** (en la parte superior).
3. Haz clic en **Set up a custom domain**.
4. Escribe: `rematemarket.pe` (y repite el paso para `www.rematemarket.pe` si deseas cobertura total).
5. Cloudflare Pages creará automáticamente las reglas DNS necesarias en tu zona DNS del dominio y emitirá el certificado de seguridad SSL en pocos minutos.

¡Listo! Tu web de Next.js estará en línea con HTTPS seguro en **`https://rematemarket.pe`**.
