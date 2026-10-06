import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { ImageReveal, Reveal } from '../components/Reveal'
import { weddingData } from '../data/weddingData'

export function Welcome() {
  const { welcome } = weddingData

  return (
    <section
      id="home"
      className="paper-texture relative overflow-hidden bg-cream px-5 py-24 sm:px-8 sm:py-32 lg:py-40"
    >
      <div className="vertical-stripes pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div className="md:col-span-5 lg:pr-4">
          <Reveal>
            <SectionLabel>{welcome.label}</SectionLabel>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 whitespace-pre-line font-serif text-4xl leading-[1.15] font-light text-ink sm:text-5xl lg:text-[3.25rem]">
              {welcome.heading}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <DecorativeLine className="mx-0 mt-8" />
          </Reveal>
          <Reveal delay={3}>
            <p className="mt-8 max-w-md font-sans text-sm leading-[1.85] font-light text-ink/70 sm:text-[15px]">
              {welcome.message}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] md:aspect-[4/3]">
            <img
              src={welcome.image}
              alt="Suasana pernikahan"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  )
}
