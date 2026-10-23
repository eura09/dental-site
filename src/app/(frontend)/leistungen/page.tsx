import type { Metadata } from 'next'

import { ServiceCard } from '@/components/ServiceCard'
import { getPractice, getServices } from '@/lib/payload'

export async function generateMetadata(): Promise<Metadata> {
  const practice = await getPractice()
  return {
    title: `Leistungen – Zahnarzt in ${practice.address.city}`,
    description: `Prophylaxe, Implantate, CEREC, Wurzelbehandlung, Kinderzahnmedizin und mehr – alle Leistungen der ${practice.name} in ${practice.address.city}.`,
    alternates: { canonical: '/leistungen' },
  }
}

export default async function ServicesPage() {
  const services = await getServices()
  return (
    <section className="section">
      <div className="container">
        <h1>Leistungen</h1>
        <p className="lead">
          Von der Vorsorge bis zum Implantat – sanft, verständlich erklärt und auf Sie abgestimmt.
        </p>
        <ul className="cards">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </ul>
      </div>
    </section>
  )
}
