import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { ImageReveal, Reveal } from '../components/Reveal'
import { weddingData } from '../data/weddingData'

export function Venue() {
  const { venue } = weddingData

  return (
    <section id="venue" className="bg-ivory px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center sm:mb-16">
          <SectionLabel>Lokasi</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            Tempat Acara
          </h2>
          <DecorativeLine className="mt-6" />
        </Reveal>

        <ImageReveal className="mb-10 aspect-[16/10] overflow-hidden sm:mb-12 sm:aspect-[21/9]">
          <img
            src={venue.image}
            alt={venue.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </ImageReveal>

        <Reveal className="mx-auto max-w-md text-center">
          <h3 className="font-serif text-2xl font-light text-botanical sm:text-3xl">{venue.name}</h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">{venue.address}</p>

          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border border-botanical px-6 py-2.5 font-sans text-[10px] font-medium tracking-[0.24em] text-botanical uppercase transition hover:bg-botanical hover:text-cream"
          >
            Buka Google Maps
          </a>
        </Reveal>

        <Reveal delay={1} className="mt-12 overflow-hidden border border-taupe/30 sm:mt-14">
          <iframe
            title="Peta lokasi acara"
            src={venue.mapsEmbed}
            className="h-56 w-full border-0 sm:h-72 md:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  )
}
