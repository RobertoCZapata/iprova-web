# Guía de Optimización de Imágenes - iPROVA

Esta guía explica cómo optimizar las imágenes del sitio web para máxima velocidad y mejor SEO.

## 📊 Estado Actual

| Imagen | Tamaño Original | Estado | Prioridad |
|--------|----------------|---------|-----------|
| `heroSectionImage.png` | **7.8 MB** | 🔴 Crítico | Alta |
| `handshake.jpg` | **8.7 MB** | 🔴 Crítico | Alta |
| `fingerPrint.jpg` | 860 KB | 🟡 Medio | Media |
| `iProva-logo.png` | 102 KB | 🟢 OK | Baja |
| Fotos del equipo | Variable | 🟡 Revisar | Media |

**Impacto**: Las 2 imágenes grandes (16.5 MB) están causando tiempos de carga de 30-60 segundos en conexiones promedio.

---

## 🚀 Optimización Automática (Recomendado)

### Paso 1: Instalar Sharp

```bash
npm install sharp --save-dev
```

### Paso 2: Ejecutar el Script de Optimización

```bash
node scripts/optimize-images.js
```

Este script automáticamente:
- ✅ Crea respaldos de los originales en `public/images/originals/`
- ✅ Convierte imágenes a WebP (90% más ligero)
- ✅ Redimensiona a tamaños óptimos
- ✅ Comprime manteniendo calidad visual
- ✅ Genera reporte de ahorro

### Paso 3: Verificar Resultados

1. Abre el sitio en desarrollo: `npm run dev`
2. Navega a http://localhost:3000
3. Verifica que las imágenes se vean bien
4. Revisa las métricas en DevTools → Network

---

## 📦 Tamaños Objetivo

| Tipo de Imagen | Dimensiones | Peso Máximo | Formato |
|----------------|-------------|-------------|---------|
| Hero principal | 1920x1080px | 200-500 KB | WebP |
| Imágenes grandes | 1200px ancho | 150-300 KB | WebP |
| Fotos del equipo | 600x600px | 50-100 KB | WebP |
| Logos | Original | 50-150 KB | PNG/WebP |
| Iconos | SVG preferido | 5-20 KB | SVG |

---

## 🛠️ Optimización Manual (Si no funciona el script)

### Opción 1: Usar TinyPNG (Online)

1. Ve a https://tinypng.com
2. Sube las imágenes
3. Descarga las versiones optimizadas
4. Reemplaza en `public/images/`

### Opción 2: Usar Squoosh (Google)

1. Ve a https://squoosh.app
2. Sube la imagen
3. Configura:
   - Formato: WebP
   - Calidad: 85
   - Redimensionar: Según tabla de "Tamaños Objetivo"
4. Descarga y reemplaza

### Opción 3: Usar ImageOptim (Mac)

1. Instala ImageOptim: https://imageoptim.com
2. Arrastra las imágenes a la app
3. Automáticamente las optimiza
4. Reemplaza los archivos

---

## 🔧 Configuración de Next.js

El proyecto ya está configurado en `next.config.js` con:

- ✅ **WebP automático**: Next.js convierte imágenes a WebP on-the-fly
- ✅ **Lazy loading**: Las imágenes cargan cuando están cerca del viewport
- ✅ **Responsive**: Genera múltiples tamaños automáticamente
- ✅ **Cache optimizado**: 1 año de cache para mejor performance

---

## 📝 Uso Correcto del Componente Image

### ✅ CORRECTO

```tsx
import Image from 'next/image';

// Hero (arriba del fold) - Usar priority
<Image
  src="/images/heroSectionImage.webp"
  alt="Descripción SEO optimizada"
  width={1920}
  height={1080}
  priority  // Carga inmediata
  className="object-cover"
/>

// Imágenes abajo del fold - Lazy loading automático
<Image
  src="/images/team/henry-zapata.webp"
  alt="Henry Zapata - Abogado Penalista iPROVA"
  width={600}
  height={600}
  className="object-cover"
/>

// Con fill (para fondos)
<div className="relative w-full h-screen">
  <Image
    src="/images/background.webp"
    alt="Background"
    fill
    className="object-cover"
    priority={false}  // Lazy load
  />
</div>
```

### ❌ INCORRECTO

```tsx
// NO usar <img> directamente
<img src="/images/hero.png" alt="Hero" />

// NO omitir width/height (causa layout shift)
<Image src="/images/photo.jpg" alt="Photo" />

// NO usar priority en todas las imágenes
<Image src="/images/footer-logo.png" alt="Logo" priority />
```

---

## 🎯 Checklist de Optimización

### Antes de Subir Imágenes Nuevas

- [ ] Redimensionar a tamaño máximo necesario (no más grande)
- [ ] Comprimir con TinyPNG o Squoosh
- [ ] Convertir a WebP si es posible
- [ ] Nombrar archivos descriptivamente (`hero-iprova-bucaramanga.webp`)
- [ ] Verificar que pesa menos de los límites de la tabla

### Después de Optimizar

- [ ] Ejecutar `npm run build` para verificar que no hay errores
- [ ] Probar en diferentes dispositivos (móvil, tablet, desktop)
- [ ] Verificar en DevTools que las imágenes correctas se cargan
- [ ] Medir con PageSpeed Insights: https://pagespeed.web.dev
- [ ] Commit de las imágenes optimizadas

---

## 📈 Resultados Esperados

### Antes de la Optimización
- 🐌 Tiempo de carga: 30-60 segundos
- 🔴 PageSpeed Score: 20-40/100
- 😟 Experiencia del usuario: Mala
- 📉 SEO: Penalización por velocidad

### Después de la Optimización
- ⚡ Tiempo de carga: 2-5 segundos
- 🟢 PageSpeed Score: 85-95/100
- 😊 Experiencia del usuario: Excelente
- 📈 SEO: Mejor ranking

**Ahorro estimado**: 95% de reducción de peso (16.5 MB → ~800 KB)

---

## 🔍 Herramientas de Medición

### PageSpeed Insights
```
https://pagespeed.web.dev/?url=https://iprova-web.vercel.app
```

### GTmetrix
```
https://gtmetrix.com/
```

### WebPageTest
```
https://www.webpagetest.org/
```

---

## 🆘 Solución de Problemas

### "La imagen se ve borrosa"
- Aumenta la calidad en el script: `quality: 90` → `quality: 95`
- Verifica que las dimensiones no sean muy pequeñas

### "El script no funciona"
- Verifica que Sharp esté instalado: `npm list sharp`
- Reinstala: `npm install sharp --save-dev`
- Revisa permisos de archivos: `chmod +x scripts/optimize-images.js`

### "Las imágenes no cargan en producción"
- Verifica que las imágenes estén en `public/images/`
- Revisa next.config.js: `images.formats`
- Limpia cache de Vercel: Deployments → ... → Redeploy

---

## 📚 Referencias

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [WebP vs JPEG](https://developers.google.com/speed/webp)
- [Lazy Loading Images](https://web.dev/lazy-loading-images/)

---

## 🎓 Mejores Prácticas

1. **Siempre usa Next.js Image component**, no `<img>` directo
2. **Priority solo para hero images** (arriba del fold)
3. **Alt text descriptivo** para SEO y accesibilidad
4. **Width y height siempre** para evitar layout shift
5. **WebP cuando sea posible** (90% más ligero que JPEG/PNG)
6. **Lazy loading por defecto** (sin `priority`)
7. **Dimensiones reales** (no cargar 4K para mostrar thumbnail)
8. **Cache largo** (Next.js lo hace automáticamente)

---

**Última actualización**: 2026-02-10
**Mantenido por**: Claude Opus 4.6 para iPROVA
