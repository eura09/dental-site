import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { HomePage, Media, Page, Practice, Service, TeamMember } from '@/payload-types'

export const getPayloadClient = () => getPayload({ config })

export const getPractice = cache(async (): Promise<Practice> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'practice', depth: 0 })
})

export const getHomePage = cache(async (): Promise<HomePage> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'home-page', depth: 1 })
})

export const getServices = cache(
  async (opts: { featuredOnly?: boolean } = {}): Promise<Service[]> => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      sort: 'order',
      limit: 100,
      depth: 1,
      where: opts.featuredOnly ? { featured: { equals: true } } : undefined,
    })
    return res.docs
  },
)

export const getService = cache(async (slug: string): Promise<Service | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] ?? null
})

export const getTeam = cache(async (): Promise<TeamMember[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'team-members',
    sort: 'order',
    limit: 100,
    depth: 1,
  })
  return res.docs
})

export const getPage = cache(async (slug: string): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] ?? null
})

export const getFooterPages = cache(async (): Promise<Page[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { showInFooter: { equals: true } },
    limit: 20,
    depth: 0,
  })
  return res.docs
})

/** Gibt das Media-Objekt zurück, wenn die Relation aufgelöst ist. */
export const asMedia = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in value ? (value as Media) : null
