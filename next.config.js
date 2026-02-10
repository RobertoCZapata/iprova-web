/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permitir imágenes de cualquier dominio HTTPS
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Formatos de imagen soportados (orden de preferencia)
    formats: ['image/webp', 'image/avif'],
    // Tamaños de imagen para generación responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Configuración de optimización
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 año de cache
    // Habilitar lazy loading por defecto
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimizaciones adicionales
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuración para mejor performance
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
}

module.exports = nextConfig

