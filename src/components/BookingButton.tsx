import type { Practice } from '@/payload-types'

type Props = { practice: Practice; variant?: 'primary' | 'secondary'; className?: string }

/** Online-Buchung, falls eine URL hinterlegt ist – sonst Anruf. */
export function BookingButton({ practice, variant = 'primary', className = '' }: Props) {
  const cls = `btn btn--${variant} ${className}`.trim()
  if (practice.bookingUrl) {
    return (
      <a className={cls} href={practice.bookingUrl} target="_blank" rel="noopener">
        Termin online buchen
      </a>
    )
  }
  return (
    <a className={cls} href={`tel:${practice.phoneE164}`}>
      Termin vereinbaren
    </a>
  )
}

export function CallButton({ practice, variant = 'secondary', className = '' }: Props) {
  return (
    <a className={`btn btn--${variant} ${className}`.trim()} href={`tel:${practice.phoneE164}`}>
      <span aria-hidden="true">☎</span> {practice.phone}
    </a>
  )
}
