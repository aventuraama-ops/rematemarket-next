# Guía de Despliegue y Conexión de Backend (Insforge)

Esta guía detalla los pasos para subir el código a GitHub, conectar el backend de Insforge en el futuro, y realizar el despliegue final en Cloudflare Pages con tu dominio.

---

## 1. Subir el Proyecto a GitHub

El proyecto ya está inicializado localmente con un commit limpio y configurado con el origen remoto de tu GitHub. Para subirlo:

1. Abre tu terminal en la carpeta del proyecto `rematemarket-next`.
2. Ejecuta el comando:
   ```bash
   git push -u origin master
   ```
3. Si la terminal te solicita iniciar sesión, introduce tus credenciales de GitHub (o usa tu SSH key/Personal Access Token si tienes autenticación en dos pasos activada).

*Nota: Una vez realizado este primer push, cada vez que hagas cambios solo necesitarás ejecutar `git add .`, `git commit -m "mensaje"` y `git push`.*

---

## 2. Conexión del Backend (Insforge)

Cuando construyas el backend en Insforge, debes conectar el frontend utilizando variables de entorno para no exponer información confidencial en el código público de GitHub.

### Variables de Entorno del Cliente (Públicas)
Estas variables se inyectan en el cliente del navegador y deben llevar el prefijo `NEXT_PUBLIC_`:
- `NEXT_PUBLIC_INSFORGE_URL`: La URL base de tu backend (ej. `https://xyz.supabase.co` o tu dominio de API de Insforge).
- `NEXT_PUBLIC_INSFORGE_ANON_KEY`: La clave pública/anónima del cliente para realizar consultas desde el navegador.

### Variables de Entorno del Servidor (Secretos / Privados)
Si realizas llamadas desde las API Routes de Next.js (Server Components o Route Handlers) y necesitas credenciales de administrador, no deben llevar el prefijo `NEXT_PUBLIC_`:
- `INSFORGE_SERVICE_ROLE_KEY`: La clave secreta de administración que tiene bypass de seguridad (Row Level Security). **¡NUNCA expongas esto en el cliente ni lo subas a GitHub!**

### Creación del Cliente de Base de Datos
En el código de tu frontend, inicializarás el cliente del backend usando estas variables:
```typescript
import { createClient } from "@supabase/supabase-js"; // o la librería oficial de Insforge

const insforgeUrl = process.env.NEXT_PUBLIC_INSFORGE_URL;
const insforgeAnonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

export const insforge = createClient(insforgeUrl, insforgeAnonKey);
```

---

## 3. Despliegue en Cloudflare Pages

### Paso A: Crear el Proyecto
1. Ve a tu panel de **Cloudflare** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Conecta tu cuenta de GitHub y selecciona el repositorio `rematemarket-next`.

### Paso B: Configuración del Build
Configura los siguientes valores en el formulario de creación:
- **Framework preset:** `Next.js` (si utilizas exportación estática) o selecciona la build standard para Next.js.
- **Build command:** `npm run build` (o `bun run build`).
- **Build directory:** `.next` (o `out` si activas `output: "export"` en `next.config.ts`).

### Paso C: Configuración de Variables y Secretos
**¡Antes de hacer clic en Deploy!** Configura las variables de entorno en la sección **Settings** > **Variables and Secrets** del proyecto en Cloudflare Pages:
1. Agrega una variable llamada `NEXT_PUBLIC_INSFORGE_URL` con la URL de tu backend.
2. Agrega una variable llamada `NEXT_PUBLIC_INSFORGE_ANON_KEY` con tu llave pública.
3. Si usas llaves secretas, agrégalas en la sección **Environment variables** (marcando la opción de encriptado/secreto si aplica).

### Paso D: Configurar tu Dominio Personalizado
1. Una vez desplegado, ve a la pestaña **Custom Domains** en tu proyecto de Cloudflare Pages.
2. Haz clic en **Set up a custom domain** e ingresa tu dominio (ej: `rematemarket.com`).
3. Cloudflare configurará automáticamente los registros DNS de tu dominio para apuntar a la versión de producción de forma segura y con HTTPS activo.
