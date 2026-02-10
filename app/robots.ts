import { MetadataRoute } from 'next'

/**
 * Robots.txt Configuration
 * Controla cómo los buscadores rastrean el sitio
 *
 * - Permite el rastreo de todas las páginas públicas
 * - Bloquea rutas API y administrativas
 * - Referencia al sitemap para mejor indexación
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iprova.com.co'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
