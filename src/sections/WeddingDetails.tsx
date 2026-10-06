import { Calendar, Clock, MapPin } from 'lucide-react'
import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { Reveal } from '../components/Reveal'
import { weddingData } from '../data/weddingData'

function DetailBlock({
  title,
  day,
  date,
  time,
  venue,
  address,
}: {
  title: string
  day: string
  date: string
  time: string
  venue: string
  address: string
}) {
  return (
    <Reveal className="text-center">
      <h3 className="font-serif text-2xl font-light tracking-wide text-cream sm:text-3xl">{title}</h3>
      <DecorativeLine light className="mt-5" />

      <ul className="mt-8 space-y-5 font-sans text-sm text-cream/80">
        <li className="flex flex-col items-center gap-2">
          <Calendar size={16} strokeWidth={1.25} className="text-taupe" aria-hidden />
          <span>
            {day}
            <br />
            {date}
          </span>
        </li>
        <li className="flex flex-col items-center gap-2">
          <Clock size={16} strokeWidth={1.25} className="text-taupe" aria-hidden />
          <span>{time}</span>
        </li>
        <li className="flex flex-col items-center gap-2">
          <MapPin size={16} strokeWidth={1.25} className="text-taupe" aria-hidden />
          <span className="max-w-[220px] leading-relaxed">
            {venue}
            <br />
            {address}
          </span>
        </li>
      </ul>
    </Reveal>
  )
}

export function WeddingDetails() {
  const { ceremony, reception } = weddingData

  return (
    <section id="details" className="bg-botanical px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-16 text-center sm:mb-20">
          <SectionLabel light>Simpan Tanggalnya</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-cream sm:text-4xl">
            Detail Acara
          </h2>
        </Reveal>

        <div className="relative grid gap-16 md:grid-cols-2 md:gap-20">
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-cream/15 md:block"
            aria-hidden
          />
          <DetailBlock {...ceremony} />
          <div className="md:hidden">
            <DecorativeLine light />
          </div>
          <DetailBlock {...reception} />
        </div>
      </div>
    </section>
  )
}
