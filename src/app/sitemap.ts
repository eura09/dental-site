import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { absoluteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const [services, pages] = await Promise.all([
    payload.find({
      collection: 'services',
      limit: 500,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'pages',
      limit: 500,
      depth: 0,
      where: { noindex: { not_equals: true } },
      select: { slug: true, updatedAt: true },
    }),
  ])

  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/leistungen'), changeFrequency: 'monthly', priority: 0.9 },
    ...services.docs.map((s) => ({
      url: absoluteUrl(`/leistungen/${s.slug}`),
      lastModified: s.updatedAt,
      priority: 0.8,
    })),
    { url: absoluteUrl('/team'), changeFrequency: 'yearly', priority: 0.6 },
    { url: absoluteUrl('/kontakt'), changeFrequency: 'yearly', priority: 0.7 },
    ...pages.docs.map((p) => ({
      url: absoluteUrl(`/${p.slug}`),
      lastModified: p.updatedAt,
      priority: 0.3,
    })),
  ]
}
