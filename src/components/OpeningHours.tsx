import { groupOpeningHours } from '@/lib/site'
import type { Practice } from '@/payload-types'

export function OpeningHours({ practice }: { practice: Practice }) {
  const rows = groupOpeningHours(practice.openingHours)
  if (!rows.length) return null
  return (
    <div className="hours">
      <dl>
        {rows.map((r) => (
          <div key={r.days} className="hours__row">
            <dt>{r.days}</dt>
            <dd>
              {r.times.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      {practice.hoursNote && <p className="hours__note">{practice.hoursNote}</p>}
    </div>
  )
}
