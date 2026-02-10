import { MetadataRoute } from 'next'

/**
 * Sitemap.xml Generator
 * Ayuda a Google a descubrir e indexar todas las páginas del sitio
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://iprova.com.co'
  const lastModified = new Date()

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#nosotros`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#servicios`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#equipo`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#resultados`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contacto`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}
