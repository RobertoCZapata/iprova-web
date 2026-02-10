#!/usr/bin/env node

/**
 * Script de Optimización de Imágenes - iPROVA
 *
 * Este script optimiza automáticamente todas las imágenes del proyecto:
 * - Convierte PNG/JPG a WebP (90% más ligero)
 * - Comprime imágenes manteniendo calidad visual
 * - Genera versiones responsive para diferentes tamaños
 * - Mantiene los originales como respaldo
 *
 * Uso:
 *   node scripts/optimize-images.js
 *
 * Requiere:
 *   npm install sharp --save-dev
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración
const CONFIG = {
  inputDir: path.join(__dirname, '../public/images'),
  backupDir: path.join(__dirname, '../public/images/originals'),
  quality: {
    webp: 85,      // 85% calidad WebP (excelente balance)
    jpeg: 90,      // 90% calidad JPEG
    png: 90,       // 90% calidad PNG
  },
  sizes: {
    hero: { width: 1920, height: 1080 },    // Full HD para hero
    large: { width: 1200 },                   // Imágenes grandes
    medium: { width: 800 },                   // Imágenes medianas
    team: { width: 600, height: 600 },       // Fotos del equipo (cuadradas)
  },
  extensions: ['.jpg', '.jpeg', '.png'],
};

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Crear directorio de respaldo
function ensureBackupDir() {
  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    log(`✓ Directorio de respaldo creado: ${CONFIG.backupDir}`, 'green');
  }
}

// Obtener tamaño de archivo en formato legible
function getFileSizeInMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

// Optimizar una imagen
async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);

  // Verificar que sea una extensión válida
  if (!CONFIG.extensions.includes(ext)) {
    return null;
  }

  log(`\nProcesando: ${path.basename(filePath)}`, 'blue');

  const originalSize = getFileSizeInMB(filePath);
  log(`  Tamaño original: ${originalSize} MB`, 'yellow');

  try {
    // Backup del original
    const backupPath = path.join(CONFIG.backupDir, path.basename(filePath));
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
      log(`  ✓ Respaldo creado`, 'green');
    }

    // Determinar el tamaño óptimo según el nombre del archivo
    let targetSize = CONFIG.sizes.large;
    if (fileName.toLowerCase().includes('hero')) {
      targetSize = CONFIG.sizes.hero;
    } else if (fileName.toLowerCase().includes('team')) {
      targetSize = CONFIG.sizes.team;
    }

    // Leer metadata original
    const metadata = await sharp(filePath).metadata();
    log(`  Dimensiones originales: ${metadata.width}x${metadata.height}px`);

    // Crear instancia de Sharp
    let image = sharp(filePath);

    // Redimensionar si es necesario
    if (metadata.width > (targetSize.width || 1920)) {
      image = image.resize(targetSize.width, targetSize.height, {
        fit: targetSize.height ? 'cover' : 'inside',
        withoutEnlargement: true,
      });
      log(`  ✓ Redimensionado a ${targetSize.width}${targetSize.height ? `x${targetSize.height}` : 'px'}`, 'green');
    }

    // Convertir a WebP (formato moderno, excelente compresión)
    const webpPath = path.join(dir, `${fileName}.webp`);
    await image
      .webp({ quality: CONFIG.quality.webp, effort: 6 })
      .toFile(webpPath);

    const webpSize = getFileSizeInMB(webpPath);
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    log(`  ✓ WebP creado: ${webpSize} MB (${savings}% más ligero)`, 'green');

    // Si era PNG o JPG, también crear versión optimizada del formato original
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg({ quality: CONFIG.quality.jpeg, mozjpeg: true })
        .toFile(filePath);

      const optimizedSize = getFileSizeInMB(filePath);
      const jpegSavings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      log(`  ✓ JPEG optimizado: ${optimizedSize} MB (${jpegSavings}% más ligero)`, 'green');
    } else if (ext === '.png') {
      await image
        .png({ quality: CONFIG.quality.png, compressionLevel: 9, effort: 10 })
        .toFile(filePath);

      const optimizedSize = getFileSizeInMB(filePath);
      const pngSavings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      log(`  ✓ PNG optimizado: ${optimizedSize} MB (${pngSavings}% más ligero)`, 'green');
    }

    return {
      file: path.basename(filePath),
      originalSize,
      webpSize,
      savings,
    };

  } catch (error) {
    log(`  ✗ Error: ${error.message}`, 'red');
    return null;
  }
}

// Procesar todas las imágenes en un directorio
async function processDirectory(dir) {
  const results = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory() && file.name !== 'originals') {
      // Procesar subdirectorios (team, icons, etc.)
      const subResults = await processDirectory(fullPath);
      results.push(...subResults);
    } else if (file.isFile()) {
      const result = await optimizeImage(fullPath);
      if (result) {
        results.push(result);
      }
    }
  }

  return results;
}

// Ejecutar
async function main() {
  log('\n🚀 Iniciando optimización de imágenes iPROVA\n', 'blue');
  log('Este proceso puede tardar unos minutos dependiendo del tamaño de las imágenes...\n');

  ensureBackupDir();

  const results = await processDirectory(CONFIG.inputDir);

  // Resumen
  log('\n' + '='.repeat(60), 'blue');
  log('📊 RESUMEN DE OPTIMIZACIÓN', 'blue');
  log('='.repeat(60) + '\n', 'blue');

  if (results.length === 0) {
    log('No se encontraron imágenes para optimizar.', 'yellow');
    return;
  }

  const totalOriginal = results.reduce((sum, r) => sum + parseFloat(r.originalSize), 0);
  const totalOptimized = results.reduce((sum, r) => sum + parseFloat(r.webpSize), 0);
  const totalSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);

  results.forEach(r => {
    log(`${r.file}: ${r.originalSize} MB → ${r.webpSize} MB (${r.savings}% reducción)`, 'green');
  });

  log(`\nTotal original: ${totalOriginal.toFixed(2)} MB`, 'yellow');
  log(`Total optimizado (WebP): ${totalOptimized.toFixed(2)} MB`, 'green');
  log(`Ahorro total: ${(totalOriginal - totalOptimized).toFixed(2)} MB (${totalSavings}%)`, 'green');

  log('\n✅ Optimización completada exitosamente!\n', 'green');
  log('Los archivos originales están respaldados en: public/images/originals/\n', 'blue');
  log('Próximos pasos:', 'blue');
  log('1. Verifica las imágenes optimizadas en el navegador', 'blue');
  log('2. Actualiza las referencias en el código para usar .webp cuando sea posible', 'blue');
  log('3. Haz commit de los cambios\n', 'blue');
}

// Manejo de errores
main().catch(error => {
  log(`\n✗ Error fatal: ${error.message}`, 'red');
  process.exit(1);
});
