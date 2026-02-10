#!/bin/bash

# ===================================
# Script de Prueba - Formulario de Contacto iPROVA
# ===================================
# Este script instala dependencias, construye y ejecuta la aplicación
# para probar el formulario de contacto con Resend

set -e  # Salir si hay algún error

echo "=========================================="
echo "🚀 Prueba del Formulario de Contacto iPROVA"
echo "=========================================="
echo ""

# Verificar que exista .env.local
if [ ! -f .env.local ]; then
    echo "❌ ERROR: No se encuentra .env.local"
    echo "   Por favor, asegúrate de que .env.local existe con las variables de Resend"
    exit 1
fi

# Verificar que la API key esté configurada
if ! grep -q "RESEND_API_KEY=re_" .env.local; then
    echo "❌ ERROR: RESEND_API_KEY no configurada en .env.local"
    exit 1
fi

echo "✅ Variables de entorno configuradas"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install
echo "✅ Dependencias instaladas"
echo ""

# Build
echo "🔨 Construyendo aplicación..."
npm run build
echo "✅ Build completado"
echo ""

# Iniciar servidor
echo "🌐 Iniciando servidor en http://localhost:3000"
echo ""
echo "INSTRUCCIONES DE PRUEBA:"
echo "========================"
echo "1. Abre tu navegador en: http://localhost:3000"
echo "2. Navega a la sección de Contacto (#contacto)"
echo "3. Llena el formulario con datos de prueba"
echo "4. Haz clic en 'Enviar Mensaje'"
echo "5. Verifica que:"
echo "   - El botón muestre 'Enviando...' → 'Enviado'"
echo "   - Aparezca mensaje de éxito verde"
echo "   - Recibas el email en contacto@iprova.com.co"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo "=========================================="
echo ""

npm start
