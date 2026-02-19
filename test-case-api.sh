#!/bin/bash

# Script para testear el API de consulta pública de casos

echo "🧪 Testing iPROVA Case Management System"
echo "========================================"
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:3000"

echo "📋 Paso 1: Verificar que el servidor esté corriendo"
echo "---------------------------------------------------"
if curl -s "${BASE_URL}" > /dev/null; then
    echo -e "${GREEN}✅ Servidor corriendo en ${BASE_URL}${NC}"
else
    echo -e "${RED}❌ Error: Servidor no está corriendo${NC}"
    echo "Por favor ejecuta: npm run dev"
    exit 1
fi
echo ""

echo "📋 Paso 2: Obtener casos existentes (requiere autenticación admin)"
echo "-------------------------------------------------------------------"
echo -e "${YELLOW}⚠️  Este endpoint requiere autenticación, ábrelo en el navegador:${NC}"
echo "${BASE_URL}/admin/casos"
echo ""
read -p "¿Tienes el código de un caso para probar? (ej: CASO-2026-001): " CASE_CODE

if [ -z "$CASE_CODE" ]; then
    echo -e "${RED}❌ No ingresaste un código de caso${NC}"
    exit 1
fi

echo ""
echo "📋 Paso 3: Probar API pública de consulta de caso"
echo "--------------------------------------------------"
echo "Consultando caso: ${CASE_CODE}"
echo ""

RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "${BASE_URL}/api/cases/public/${CASE_CODE}")
HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Caso encontrado (HTTP 200)${NC}"
    echo ""
    echo "Respuesta del API:"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
elif [ "$HTTP_STATUS" = "404" ]; then
    echo -e "${RED}❌ Caso no encontrado (HTTP 404)${NC}"
    echo "Verifica que el código sea correcto: ${CASE_CODE}"
    echo ""
    echo "Respuesta:"
    echo "$BODY"
elif [ "$HTTP_STATUS" = "500" ]; then
    echo -e "${RED}❌ Error del servidor (HTTP 500)${NC}"
    echo "Verifica los logs del servidor"
    echo ""
    echo "Respuesta:"
    echo "$BODY"
else
    echo -e "${RED}❌ Error inesperado (HTTP ${HTTP_STATUS})${NC}"
    echo "Respuesta:"
    echo "$BODY"
fi

echo ""
echo "📋 Paso 4: Probar página pública de consulta"
echo "---------------------------------------------"
echo "Abre en tu navegador:"
echo "${BASE_URL}/consultar-caso"
echo ""
echo "Ingresa el código: ${CASE_CODE}"
echo ""

echo "📋 Paso 5: Escenarios de prueba"
echo "--------------------------------"
echo ""
echo "✅ Casos a probar:"
echo "  1. Código válido → Debe mostrar información del caso"
echo "  2. Código inválido (ej: CASO-9999-999) → Error 'Caso no encontrado'"
echo "  3. Campo vacío → Error 'Por favor ingrese un código'"
echo "  4. Diferentes prioridades (baja, media, alta, urgente)"
echo "  5. Fechas límite (pasadas, próximas, futuras)"
echo "  6. Diferentes estados (activo, finalizado, archivado)"
echo ""

echo "✅ Verificar elementos visuales:"
echo "  - Badges de prioridad con colores correctos"
echo "  - Badges de estado con colores correctos"
echo "  - Alertas de deadline (rojo=vencido, naranja=próximo)"
echo "  - Formato de fechas en español"
echo "  - Nombre del abogado responsable"
echo ""

echo "🎉 Testing completado!"
echo ""
echo "Para más pruebas, crea casos adicionales con diferentes:"
echo "  - Prioridades: baja, media, alta, urgente"
echo "  - Estados: activo, finalizado, archivado"
echo "  - Deadlines: pasados, próximos (1-3 días), futuros"
