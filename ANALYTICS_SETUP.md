# 📊 Guía de Configuración: Google Analytics 4

Esta guía te ayudará a configurar Google Analytics 4 (GA4) en el sitio de iPROVA para medir tráfico, conversiones y comportamiento de usuarios.

---

## 🎯 ¿Por Qué Necesitas Analytics?

Sin analytics estás "ciego":
- ❌ No sabes cuántos visitantes tienes
- ❌ No sabes de dónde vienen (Google, redes sociales, etc.)
- ❌ No puedes medir conversiones (formularios, llamadas)
- ❌ No sabes si tus mejoras SEO funcionan

Con analytics puedes:
- ✅ Medir visitantes en tiempo real
- ✅ Ver qué keywords traen tráfico
- ✅ Identificar páginas más populares
- ✅ Medir conversiones y ROI
- ✅ Tomar decisiones basadas en datos

---

## 📋 Paso 1: Crear Cuenta de Google Analytics

### 1.1 Accede a Google Analytics
Ve a [analytics.google.com](https://analytics.google.com) e inicia sesión con tu cuenta de Google.

### 1.2 Crear Cuenta (si no tienes una)
1. Click en **"Comenzar a medir"**
2. Nombre de cuenta: `iPROVA`
3. Configuración de datos compartidos: Deja opciones por defecto
4. Click **"Siguiente"**

### 1.3 Crear Propiedad
1. Nombre de propiedad: `iPROVA Website`
2. Zona horaria: **Colombia (GMT-5)**
3. Moneda: **COP - Peso colombiano**
4. Click **"Siguiente"**

### 1.4 Información Empresarial
1. Sector: **Servicios profesionales** > **Servicios legales**
2. Tamaño de empresa: **Pequeña (1-10 empleados)**
3. Uso previsto:
   - ☑️ Medir la interacción con el sitio
   - ☑️ Obtener información sobre los clientes
4. Click **"Crear"**
5. Acepta los Términos de Servicio

### 1.5 Configurar Flujo de Datos Web
1. Plataforma: **Web**
2. URL del sitio web: `https://iprova.com.co` (o tu URL de Vercel actual)
3. Nombre del flujo: `iPROVA Main Site`
4. Click **"Crear flujo"**

### 1.6 Copiar Measurement ID
Verás una pantalla con tu **Measurement ID**:
```
G-XXXXXXXXXX
```

**🔴 IMPORTANTE**: Copia este ID, lo necesitarás en el siguiente paso.

---

## 🔧 Paso 2: Configurar en el Sitio Web

### 2.1 Crear archivo .env.local

En la raíz del proyecto, crea un archivo `.env.local` (si no existe):

```bash
# En la terminal, desde la raíz del proyecto:
cp .env.example .env.local
```

### 2.2 Agregar Measurement ID

Abre `.env.local` y agrega tu Measurement ID:

```bash
NEXT_PUBLIC_SITE_URL=https://iprova.com.co
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # ← Reemplaza con tu ID real
```

**🔒 SEGURIDAD**: El archivo `.env.local` ya está en `.gitignore` y NO se subirá a GitHub.

### 2.3 Configurar en Vercel (Producción)

Para que funcione en producción:

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Click en **Settings** > **Environment Variables**
3. Agrega las siguientes variables:

| Key | Value | Environments |
|-----|-------|--------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://iprova.com.co` | Production |

4. Click **"Save"**
5. **Redeploy** el sitio para aplicar cambios

---

## ✅ Paso 3: Verificar Instalación

### 3.1 Probar Localmente

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Abre tu sitio en `http://localhost:3000`

**NOTA**: Analytics NO se carga en desarrollo. Para probar:
```bash
npm run build
npm start
```

### 3.2 Verificar en Google Analytics

1. Ve a Google Analytics
2. En el menú lateral, click en **Informes** > **Tiempo real**
3. Abre tu sitio web en otra pestaña
4. Deberías ver tu visita en tiempo real (aparece en ~30 segundos)

✅ **Si ves tu visita**: ¡Analytics está funcionando!
❌ **Si no ves nada**: Revisa la consola del navegador (F12) para errores

### 3.3 Verificar con Google Tag Assistant

Extensión recomendada para Chrome:
1. Instala [Tag Assistant Legacy](https://chrome.google.com/webstore)
2. Abre tu sitio
3. Click en la extensión
4. Debe mostrar: ✅ Google Analytics - Connected

---

## 📊 Paso 4: Configurar Conversiones

### 4.1 Eventos Automáticos

Google Analytics ya trackea automáticamente:
- ✅ Pageviews (vistas de página)
- ✅ Scroll (porcentaje de scroll)
- ✅ Outbound clicks (clicks a enlaces externos)
- ✅ File downloads (descargas)
- ✅ Video engagement

### 4.2 Eventos Personalizados Configurados

El sitio ya tiene configurados estos eventos personalizados:

| Evento | Se activa cuando | Ubicación |
|--------|------------------|-----------|
| `contact_whatsapp` | Click en botón WhatsApp | Widget flotante, CTA section |
| `contact_phone` | Click en número telefónico | CTA section, Header |
| `contact_email` | Click en email | Footer, Contact section |
| `form_submit` | Envío de formulario | Contact form section |
| `cta_click` | Click en Call-to-Action | Hero, CTA section |

### 4.3 Configurar como Conversiones en GA4

1. Ve a Google Analytics
2. Click en **Admin** (engranaje abajo-izquierda)
3. En la columna **Propiedad**, click en **Eventos**
4. Busca los eventos: `contact_whatsapp`, `form_submit`, etc.
5. Marca cada uno como **"Conversión"** (toggle a la derecha)

Ahora podrás ver conversiones en **Informes** > **Engagement** > **Conversiones**.

---

## 📈 Paso 5: Métricas Clave a Monitorear

### 5.1 Dashboard Recomendado

En Google Analytics, crea un dashboard personalizado con:

**Tráfico**:
- Usuarios nuevos vs recurrentes
- Sesiones por fuente (Google, directo, social)
- Páginas más visitadas

**Comportamiento**:
- Duración de sesión promedio
- Porcentaje de rebote (bounce rate)
- Páginas por sesión

**Conversiones**:
- Conversiones por tipo (WhatsApp, teléfono, formulario)
- Tasa de conversión (Conversiones / Sesiones)
- Valor de conversión (si asignas valores)

### 5.2 Objetivos Iniciales

**Mes 1** (Baseline):
- Establecer métricas base
- Identificar fuentes de tráfico principales
- Ver páginas más populares

**Mes 2-3** (Optimización):
- Mejorar páginas con alta tasa de rebote
- Optimizar fuentes de tráfico de bajo rendimiento
- A/B testing de CTAs

**Mes 4+** (Crecimiento):
- Aumentar conversiones 10-20% mes a mes
- Reducir costo por conversión
- Escalar canales exitosos

---

## 🔍 Paso 6: Google Search Console (Bonus)

### 6.1 Conectar Search Console a Analytics

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu propiedad: `https://iprova.com.co`
3. Verifica propiedad (método recomendado: Google Analytics)
4. En Google Analytics:
   - **Admin** > **Product Links** > **Search Console**
   - Click **"Vincular"**

**Beneficios**:
- Ver qué búsquedas en Google llevan a tu sitio
- Identificar keywords de alto rendimiento
- Ver posición promedio en resultados
- Detectar errores de indexación

---

## 🚨 Solución de Problemas

### Problema: No veo datos en Analytics

**Causas comunes**:
1. **Measurement ID incorrecto**
   - Verifica que empiece con `G-`
   - Verifica que no tenga espacios

2. **Variable de entorno no configurada**
   - Verifica que `.env.local` exista
   - Verifica que la variable empiece con `NEXT_PUBLIC_`
   - Reinicia el servidor después de cambiar `.env.local`

3. **Ad blocker activo**
   - Desactiva extensiones de bloqueo de ads
   - Prueba en ventana de incógnito

4. **Solo carga en producción**
   - Analytics NO se carga en `npm run dev`
   - Usa `npm run build && npm start` para probar

### Problema: Analytics se carga en desarrollo

**Solución**: El componente tiene protección:
```tsx
if (process.env.NODE_ENV !== "production") {
  return null;
}
```

Si quieres probar en desarrollo, comenta esa línea temporalmente.

---

## 📚 Recursos Adicionales

**Documentación oficial**:
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)

**Tutoriales recomendados**:
- [GA4 para principiantes](https://support.google.com/analytics/answer/9304153)
- [Configurar conversiones](https://support.google.com/analytics/answer/9267568)
- [Crear dashboards personalizados](https://support.google.com/analytics/answer/1151300)

**Herramientas útiles**:
- [Google Tag Assistant](https://chrome.google.com/webstore) - Verificar implementación
- [GA4 Query Explorer](https://ga-dev-tools.google/ga4/query-explorer/) - Consultas avanzadas
- [Analytics Debugger](https://chrome.google.com/webstore) - Debug de eventos

---

## ✅ Checklist Final

Antes de considerar la configuración completa:

- [ ] Cuenta de Google Analytics creada
- [ ] Propiedad GA4 configurada
- [ ] Measurement ID obtenido (formato `G-XXXXXXXXXX`)
- [ ] Variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` en `.env.local`
- [ ] Variable configurada en Vercel (producción)
- [ ] Sitio redeployado en Vercel
- [ ] Analytics verificado en tiempo real
- [ ] Eventos marcados como conversiones
- [ ] Google Search Console conectado (bonus)
- [ ] Dashboard personalizado creado

---

## 🎯 Próximos Pasos

Una vez configurado analytics:

1. **Semana 1**: Monitorear métricas base
2. **Semana 2**: Identificar oportunidades de mejora
3. **Semana 3**: Implementar optimizaciones
4. **Semana 4**: Medir impacto de cambios

**Objetivo a 30 días**: Tener datos suficientes para tomar decisiones informadas sobre:
- Qué contenido crear
- Dónde invertir en marketing
- Qué CTAs optimizar
- Qué páginas mejorar

---

¿Necesitas ayuda? Revisa la sección de **Solución de Problemas** o consulta la documentación oficial de Google Analytics.
