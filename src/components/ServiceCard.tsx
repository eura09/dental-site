import Link from 'next/link'

import type { Service } from '@/payload-types'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <li className="card">
      <h3 className="card__title">
        <Link href={`/leistungen/${service.slug}`}>{service.title}</Link>
      </h3>
      <p>{service.summary}</p>
      <span className="card__more" aria-hidden="true">
        Mehr erfahren →
      </span>
    </li>
  )
}
