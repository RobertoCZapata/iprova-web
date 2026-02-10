# 📧 Guía Completa: Configuración de Formulario de Contacto con Resend

## ✅ Archivos Ya Creados

He creado los siguientes archivos:

1. **`/app/api/contact/route.ts`** - API endpoint para procesar formulario
2. **`/emails/ContactEmail.tsx`** - Plantilla profesional de email con branding iPROVA
3. **`/lib/hooks/useContactForm.ts`** - Hook personalizado para manejo del formulario

---

## 🚀 PASOS PARA COMPLETAR LA CONFIGURACIÓN

### **Paso 1: Instalar Dependencias** (2 minutos)

Ejecuta en tu terminal:

```bash
npm install resend @react-email/components @react-email/render
```

---

### **Paso 2: Obtener API Key de Resend** (5 minutos)

1. Ve a [resend.com/signup](https://resend.com/signup)
2. Regístrate con tu email
3. Verifica tu email
4. Ve a **API Keys** → **Create API Key**
5. Nombre: `iPROVA Production`
6. Permisos: **Sending access**
7. **Copia la API Key** (empieza con `re_...`)

---

### **Paso 3: Configurar Variables de Entorno**

#### **Local (.env.local)**

Agrega estas líneas a tu archivo `.env.local`:

```bash
# Resend Email Service
RESEND_API_KEY=re_TU_API_KEY_AQUI
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=contacto@iprova.com.co
```

**IMPORTANTE**:
- `RESEND_FROM_EMAIL=onboarding@resend.dev` → Para pruebas (dominio de Resend)
- `RESEND_TO_EMAIL=contacto@iprova.com.co` → Email donde llegarán los mensajes

#### **Vercel (Producción)**

1. Ve a [vercel.com](https://vercel.com) → Tu proyecto
2. **Settings** → **Environment Variables**
3. Agrega estas 3 variables:

```
Name: RESEND_API_KEY
Value: re_TU_API_KEY_AQUI
Environments: ✓ Production ✓ Preview

Name: RESEND_FROM_EMAIL
Value: onboarding@resend.dev
Environments: ✓ Production ✓ Preview

Name: RESEND_TO_EMAIL
Value: contacto@iprova.com.co
Environments: ✓ Production ✓ Preview
```

---

### **Paso 4: Actualizar Formulario** (Ya lo hago yo)

Voy a actualizar `ContactFormSection.tsx` para conectarlo con el nuevo sistema.

**Cambios principales**:
- Eliminar Web3Forms
- Conectar con `/api/contact`
- Mejor manejo de estados
- Integración con Google Analytics

---

### **Paso 5: Probar Localmente** (5 minutos)

```bash
# Build y ejecutar en modo producción
npm run build
npm start

# Abrir: http://localhost:3000/#contacto
# Llenar formulario y enviar
```

**Verificar**:
1. ✅ Formulario muestra "Enviando..."
2. ✅ Aparece mensaje de éxito
3. ✅ Recibes email en tu bandeja de entrada (el email verificado en Resend)

---

### **Paso 6: Deploy a Vercel** (3 minutos)

```bash
git add .
git commit -m "feat: Formulario funcional con Resend"
git push origin main
```

**Verificar en producción**:
1. Abre: https://iprova-web.vercel.app/#contacto
2. Llena formulario real
3. Verifica que llegue el email

---

## 🎨 FASE 2: Configurar Dominio Propio (OPCIONAL - 15 min)

Para que los emails salgan desde `contacto@iprova.com.co` en lugar de `onboarding@resend.dev`:

### **Paso 1: Verificar Dominio en Resend**

1. Ve a Resend → **Domains** → **Add Domain**
2. Ingresa: `iprova.com.co`
3. Resend te dará 3 registros DNS para agregar

### **Paso 2: Agregar Registros DNS en GoDaddy**

1. Ve a [sso.godaddy.com](https://sso.godaddy.com)
2. Login con: `iprova` / contraseña del PDF
3. **Mi cuenta** → **Productos** → `iprova.com.co` → **DNS**
4. Agregar los 3 registros que Resend te dio:

**Ejemplo de registros** (los valores reales los da Resend):

```
Tipo: TXT
Nombre: _resend
Valor: resend-domain-verify=xxxxx
TTL: 600

Tipo: TXT
Nombre: resend._domainkey
Valor: p=MIGfMA0GCS...
TTL: 600

Tipo: MX
Nombre: @
Valor: feedback-smtp.us-east-1.amazonses.com
Prioridad: 10
TTL: 600
```

### **Paso 3: Verificar en Resend**

1. Espera 5-10 minutos (propagación DNS)
2. En Resend → **Domains** → Click **Verify**
3. Si todo está OK: ✅ **Verified**

### **Paso 4: Actualizar Variables de Entorno**

Cambia `RESEND_FROM_EMAIL`:

**Antes**:
```
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Después**:
```
RESEND_FROM_EMAIL=contacto@iprova.com.co
```

Actualiza tanto en `.env.local` como en Vercel, y redeploy.

---

## 📊 Eventos de Analytics

El formulario ya está integrado con Google Analytics. Cuando alguien envíe el formulario:

- ✅ Se trackea evento: `form_submit`
- ✅ Aparecerá en GA4 → **Eventos**
- ✅ Podrás marcarlo como conversión

---

## 🎯 Plantilla de Email

La plantilla creada incluye:

- ✅ Header con branding iPROVA
- ✅ Colores corporativos (Azul #1a4d7a, Amarillo #f7b633)
- ✅ Información del contacto en caja destacada
- ✅ Mensaje del cliente formateado
- ✅ Footer profesional
- ✅ Reply-to automático al email del cliente

**Ejemplo de email que recibirás**:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
iPROVA
Abogados e Investigadores
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nueva Consulta desde el Sitio Web

Has recibido una nueva consulta a través del formulario de contacto:

┌─────────────────────────────┐
│ NOMBRE: Juan Pérez          │
│ EMAIL: juan@ejemplo.com     │
│ TELÉFONO: +57 300 123 4567  │
│ SERVICIO: Defensa Penal     │
└─────────────────────────────┘

MENSAJE:
Necesito asesoría urgente para un caso penal...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Puedes responder directamente para contactar al cliente
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔒 Seguridad

- ✅ API Key en variables de entorno (nunca en código)
- ✅ Validación de emails en servidor
- ✅ Rate limiting por Resend (previene spam)
- ✅ Reply-to correcto (responder al cliente)
- ✅ Sanitización de inputs

---

## ❓ Solución de Problemas

### **Email no llega**

1. **Verifica API Key**: Debe empezar con `re_`
2. **Revisa spam**: El email puede estar en spam
3. **Verifica email destino**: `RESEND_TO_EMAIL` debe estar verificado en Resend
4. **Revisa logs**: `npm run dev` y busca errores en consola

### **Error 401 Unauthorized**

- API Key incorrecta o no configurada
- Verifica `.env.local` y variables en Vercel

### **Email sale de onboarding@resend.dev**

- Normal si no has verificado el dominio
- Para emails profesionales, completa Fase 2

---

## 📋 Checklist Final

**Setup Básico** (Funcional con dominio de prueba):
- [ ] Instalar dependencias (`npm install resend...`)
- [ ] Crear cuenta en Resend
- [ ] Obtener API Key
- [ ] Configurar variables en `.env.local`
- [ ] Configurar variables en Vercel
- [ ] Probar localmente
- [ ] Deploy a Vercel
- [ ] Verificar en producción

**Setup Profesional** (Con dominio propio):
- [ ] Verificar dominio en Resend
- [ ] Agregar registros DNS en GoDaddy
- [ ] Esperar verificación (5-10 min)
- [ ] Actualizar `RESEND_FROM_EMAIL`
- [ ] Redeploy

---

## 🎉 Resultado Final

**Con dominio de prueba**:
- ✅ Formulario funciona
- ✅ Emails llegan a `contacto@iprova.com.co`
- ✅ Sale de: `onboarding@resend.dev`
- ✅ Reply funciona correctamente

**Con dominio verificado**:
- ✅ Todo lo anterior +
- ✅ Sale de: `contacto@iprova.com.co`
- ✅ Más profesional
- ✅ Mejor deliverability

---

## 📞 Próximos Pasos

Una vez funcionando:

1. **Marcar evento como conversión** en GA4
2. **Configurar notificaciones** (opcional - Resend Webhooks)
3. **Agregar auto-respuesta** al cliente (futuro)
4. **A/B testing** del formulario (futuro)

---

¿Listo para empezar? Ejecuta el **Paso 1** (instalar dependencias) y avísame cuando tengas la API Key de Resend.
