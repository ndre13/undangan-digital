import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { Reveal } from '../components/Reveal'
import { weddingData } from '../data/weddingData'

export function OurStory() {
  const { story } = weddingData

  return (
    <section id="story" className="paper-texture bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-16 text-center sm:mb-20">
          <SectionLabel>Perjalanan Kami</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            Kisah Kami
          </h2>
          <DecorativeLine className="mt-6" />
        </Reveal>

        <ol className="relative space-y-0">
          <div
            className="absolute top-2 bottom-2 left-[7px] w-px bg-taupe/50 sm:left-1/2 sm:-translate-x-px"
            aria-hidden
          />

          {story.map((item, index) => {
            const isEven = index % 2 === 0
            return (
              <li key={item.year} className="relative pb-14 last:pb-0 sm:pb-16">
                <Reveal
                  className={`grid gap-4 sm:grid-cols-2 sm:gap-10 ${
                    isEven ? '' : 'sm:[&>*:first-child]:order-2'
                  }`}
                >
                  <div
                    className={`pl-8 sm:pl-0 ${
                      isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'
                    }`}
                  >
                    <p className="font-serif text-3xl font-light text-botanical sm:text-4xl">
                      {item.year}
                    </p>
                    <h3 className="mt-2 font-sans text-[11px] font-medium tracking-[0.22em] text-ink uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-3 whitespace-pre-line font-sans text-sm leading-relaxed font-light text-ink/65">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`pl-8 sm:pl-0 ${isEven ? 'sm:pl-12' : 'sm:pr-12 sm:flex sm:justify-end'}`}
                  >
                    {item.image ? (
                      <div className="aspect-[4/3] w-full max-w-[260px] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] w-full max-w-[260px] items-center justify-center border border-taupe/40 bg-ivory">
                        <span className="font-script text-3xl text-botanical">A & L</span>
                      </div>
                    )}
                  </div>
                </Reveal>

                <span
                  className="absolute top-2 left-0 h-3.5 w-3.5 rounded-full border border-botanical bg-cream sm:left-1/2 sm:-translate-x-1/2"
                  aria-hidden
                />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
