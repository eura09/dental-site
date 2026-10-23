import type { Metadata } from 'next'
import Image from 'next/image'

import { RichText } from '@/components/RichText'
import { asMedia, getPractice, getTeam } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const practice = await getPractice()
  return {
    title: 'Team',
    description: `Lernen Sie das Team der ${practice.name} in ${practice.address.city} kennen.`,
    alternates: { canonical: '/team' },
  }
}

export default async function TeamPage() {
  const team = await getTeam()
  return (
    <section className="section">
      <div className="container">
        <h1>Unser Team</h1>
        <p className="lead">Persönlich, ruhig und mit viel Erfahrung – wir sind für Sie da.</p>
        <ul className="team">
          {team.map((m) => {
            const photo = asMedia(m.photo)
            return (
              <li key={m.id} className={`team__member${m.isDentist ? ' team__member--lead' : ''}`}>
                <div className="team__photo">
                  {photo?.url ? (
                    <Image
                      src={photo.sizes?.card?.url || photo.url}
                      alt={photo.alt}
                      width={800}
                      height={600}
                      sizes="(max-width: 700px) 100vw, 33vw"
                    />
                  ) : (
                    <span className="team__initials" aria-hidden="true">
                      {m.name
                        .split(' ')
                        .filter((w) => /^[A-ZÄÖÜ]/.test(w))
                        .map((w) => w[0])
                        .slice(-2)
                        .join('')}
                    </span>
                  )}
                </div>
                <div className="team__body">
                  <h2>{m.name}</h2>
                  <p className="team__role">{m.role}</p>
                  <RichText data={m.bio} />
                  {!!m.qualifications?.length && (
                    <ul className="team__quals">
                      {m.qualifications.map((q) => (
                        <li key={q.id}>{q.text}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
