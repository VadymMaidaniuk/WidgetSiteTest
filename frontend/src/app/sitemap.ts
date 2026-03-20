import type { MetadataRoute } from 'next'
import { siteRoutes } from '@/lib/site-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-03-20')

  return siteRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }))
}
