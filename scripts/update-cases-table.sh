#!/bin/bash

# Script para actualizar la tabla cases con campos priority y deadline

echo "🔄 Actualizando tabla cases en Supabase..."

# Leer las credenciales desde .env.local
if [ ! -f .env.local ]; then
  echo "❌ Error: Archivo .env.local no encontrado"
  exit 1
fi

# Obtener la URL de Supabase
SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d '=' -f2)

if [ -z "$SUPABASE_URL" ]; then
  echo "❌ Error: No se encontró NEXT_PUBLIC_SUPABASE_URL en .env.local"
  exit 1
fi

echo "📊 Supabase URL: $SUPABASE_URL"
echo ""
echo "Para ejecutar el script SQL:"
echo "1. Ve a: ${SUPABASE_URL/https:\/\//https://supabase.com/dashboard/project/}/editor"
echo "2. Copia el contenido de: supabase-cases-update.sql"
echo "3. Pégalo en el editor SQL"
echo "4. Haz clic en 'Run'"
echo ""
echo "✅ Una vez ejecutado, podrás crear casos con prioridad y deadline"
