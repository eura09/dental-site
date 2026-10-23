import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/RichText'
import { getPage } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return {}
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description ?? undefined,
    alternates: { canonical: `/${page.slug}` },
    robots: page.noindex ? { index: false, follow: true } : undefined,
  }
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()
  return (
    <section className="section">
      <div className="container container--narrow">
        <h1>{page.title}</h1>
        <RichText data={page.body} />
      </div>
    </section>
  )
}
