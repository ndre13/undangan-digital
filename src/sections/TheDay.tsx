import { Camera, Gem, Heart, Wine } from 'lucide-react'
import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { Reveal } from '../components/Reveal'
import { weddingData } from '../data/weddingData'

const iconMap = {
  rings: Gem,
  camera: Camera,
  champagne: Wine,
  heart: Heart,
}

export function TheDay() {
  const { timeline } = weddingData

  return (
    <section id="event" className="paper-texture bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <Reveal className="mb-14 text-center sm:mb-16">
          <SectionLabel>Jadwal</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            Hari Bahagia
          </h2>
          <p className="mt-4 font-sans text-sm font-light text-ink/60 italic sm:text-[15px]">
            Setiap momen adalah bagian dari kisah kami.
          </p>
          <DecorativeLine className="mt-6" />
        </Reveal>

        <ul className="space-y-0">
          {timeline.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <li key={item.time}>
                <Reveal delay={(index % 4) as 0 | 1 | 2 | 3}>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-6 sm:gap-8 sm:py-7">
                    <p className="text-right font-serif text-2xl font-light text-botanical sm:text-3xl">
                      {item.time}
                    </p>
                    <span className="flex h-10 w-10 items-center justify-center border border-taupe/50 text-sage">
                      <Icon size={16} strokeWidth={1.25} aria-hidden />
                    </span>
                    <p className="font-sans text-sm tracking-wide text-ink sm:text-[15px]">
                      {item.title}
                    </p>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="mx-auto h-6 w-px bg-taupe/40" aria-hidden />
                  )}
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
