# Configuración de Variables de Entorno en Vercel

Este documento explica cómo configurar las variables de entorno en Vercel para que el formulario de contacto funcione en producción.

## Variables Requeridas

Debes configurar las siguientes variables de entorno en Vercel:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://iprova.com.co` | URL pública del sitio |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-YY9NZ3XT07` | Google Analytics Measurement ID |
| `RESEND_API_KEY` | `re_HDi4yxFG_FTuxZmrNXtExeLELh8qhTYkg` | API Key de Resend |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` | Email remitente (FROM) |
| `RESEND_TO_EMAIL` | `contacto@iprova.com.co` | Email destinatario (TO) |

## Pasos para Configurar en Vercel

### Opción 1: Desde la Web (Recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Selecciona tu proyecto **iPROVA Web**
3. Ve a **Settings** (⚙️ en la barra superior)
4. En el menú lateral, selecciona **Environment Variables**
5. Para cada variable:
   - Haz clic en **Add New**
   - **Key**: Nombre de la variable (ej: `RESEND_API_KEY`)
   - **Value**: Valor de la variable (ej: `re_HDi4yxFG_FTuxZmrNXtExeLELh8qhTYkg`)
   - **Environments**: Selecciona **Production**, **Preview**, y **Development**
   - Haz clic en **Save**

### Opción 2: Desde la CLI

Si tienes instalado Vercel CLI (`npm install -g vercel`):

```bash
vercel env add RESEND_API_KEY production
# Cuando te pida el valor, pega: re_HDi4yxFG_FTuxZmrNXtExeLELh8qhTYkg

vercel env add RESEND_FROM_EMAIL production
# Valor: onboarding@resend.dev

vercel env add RESEND_TO_EMAIL production
# Valor: contacto@iprova.com.co
```

## Re-Deploy Después de Configurar

⚠️ **IMPORTANTE**: Después de agregar/modificar variables de entorno, debes hacer un nuevo deploy para que los cambios surtan efecto.

### Opción 1: Push a GitHub
```bash
git add .
git commit -m "feat: Formulario funcional con Resend"
git push origin main
```

Vercel detectará el push automáticamente y hará un nuevo deploy.

### Opción 2: Redeploy Manual
1. Ve a tu proyecto en Vercel
2. Ve a la pestaña **Deployments**
3. Encuentra el último deployment exitoso
4. Haz clic en el menú de tres puntos (...) a la derecha
5. Selecciona **Redeploy**

## Verificar la Configuración

Después del deploy:

1. Ve a tu sitio en producción: https://iprova-web.vercel.app
2. Navega a la sección de contacto: https://iprova-web.vercel.app/#contacto
3. Llena el formulario y envíalo
4. Deberías recibir el email en `contacto@iprova.com.co`
5. Verifica en Google Analytics que se registre el evento `form_submit`

## Solución de Problemas

### Error: "RESEND_API_KEY no configurada"
- Verifica que la variable esté configurada en Vercel
- Asegúrate de haber hecho un redeploy después de agregar la variable
- Verifica que no haya espacios extra en el valor de la API key

### No llegan los emails
- Verifica que la API key sea correcta y esté activa en resend.com
- Revisa los logs de Vercel: **Deployments** → Click en el deployment → **Functions** → Click en `/api/contact`
- Verifica en Resend Dashboard que los emails se estén enviando: https://resend.com/emails

### Email llega a spam
- Por ahora es normal porque usas `onboarding@resend.dev`
- Para solucionarlo, verifica tu dominio `iprova.com.co` en Resend (ver FORMULARIO_SETUP.md)

## Próximos Pasos (Opcional pero Recomendado)

Para enviar emails profesionales desde `contacto@iprova.com.co`:

1. Ve a [resend.com/domains](https://resend.com/domains)
2. Agrega el dominio `iprova.com.co`
3. Configura los registros DNS en GoDaddy (Resend te dará las instrucciones específicas)
4. Espera a que se verifique (puede tomar unos minutos)
5. Actualiza la variable `RESEND_FROM_EMAIL` en Vercel a `contacto@iprova.com.co`
6. Haz un redeploy

Ver guía completa en: [FORMULARIO_SETUP.md](FORMULARIO_SETUP.md#fase-2-opcional-verificar-dominio-propio)
