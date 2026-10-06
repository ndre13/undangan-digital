import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { ImageReveal, Reveal } from '../components/Reveal'
import { weddingData } from '../data/weddingData'

function LeafOrnament({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 24"
      fill="none"
      aria-hidden
      className={`h-5 w-10 text-taupe/70 ${flip ? '-scale-x-100' : ''} ${className}`}
    >
      <path
        d="M2 12c8-8 18-10 22-10 4 0 14 2 22 10"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M24 2c0 6-2 10-6 14M24 2c0 6 2 10 6 14"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <circle cx="24" cy="12" r="1.25" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

function PersonCard({
  label,
  name,
  relation,
  father,
  mother,
  align,
  delay = 0,
}: {
  label: string
  name: string
  relation: string
  father: string
  mother: string
  align: 'left' | 'right'
  delay?: 0 | 1 | 2 | 3
}) {
  const isLeft = align === 'left'

  return (
    <article
      className={`relative flex flex-col items-center text-center ${
        isLeft ? 'md:items-end md:pr-10 md:text-right' : 'md:items-start md:pl-10 md:text-left'
      }`}
    >
      <Reveal className="w-full max-w-sm" delay={delay}>
        <div
          className={`mb-5 flex items-center justify-center gap-3 ${
            isLeft ? 'md:justify-end' : 'md:justify-start'
          }`}
        >
          {!isLeft && <LeafOrnament className="hidden md:block" />}
          <LeafOrnament className="md:hidden" flip={isLeft} />
          <SectionLabel>{label}</SectionLabel>
          {isLeft && <LeafOrnament flip className="hidden md:block" />}
        </div>

        <h3 className="font-script text-[2.75rem] leading-[1.15] text-botanical sm:text-5xl lg:text-6xl">
          {name}
        </h3>

        <DecorativeLine className={`mt-6 ${isLeft ? 'md:ml-auto md:mr-0' : 'md:mx-0'}`} />

        <p className="mt-6 font-serif text-sm font-light tracking-wide text-sage italic sm:text-[15px]">
          {relation}
        </p>
        <p className="mt-2 font-sans text-xs leading-[1.95] tracking-[0.04em] text-ink/70 sm:text-sm">
          Bapak {father}
          <br />
          &amp; Ibu {mother}
        </p>
      </Reveal>
    </article>
  )
}

export function Couple() {
  const { bride, groom, couplePhoto } = weddingData

  return (
    <section
      id="couple"
      className="paper-texture relative overflow-hidden bg-ivory px-5 py-24 sm:px-8 sm:py-32"
    >
      <div
        className="pointer-events-none absolute top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-botanical/[0.03] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center sm:mb-14">
          <div className="mb-4 flex items-center justify-center gap-3">
            <LeafOrnament />
            <SectionLabel>Mempelai</SectionLabel>
            <LeafOrnament flip />
          </div>
          <h2 className="font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            Pengantin Pria &amp; Wanita
          </h2>
        </Reveal>

        <ImageReveal className="relative mb-16 aspect-[16/10] w-full overflow-hidden sm:mb-20 sm:aspect-[21/9]">
          <img
            src={couplePhoto}
            alt={`${groom.name} & ${bride.name}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream/25"
            aria-hidden
          />
        </ImageReveal>

        <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-0">
          <PersonCard
            label="Mempelai Wanita"
            name={bride.name}
            relation="Putri dari"
            father={bride.parents.father}
            mother={bride.parents.mother}
            align="left"
          />

          <div className="flex flex-col items-center justify-center py-2 md:px-4 lg:px-8" aria-hidden>
            <div className="hidden h-16 w-px bg-gradient-to-b from-transparent via-taupe/60 to-transparent md:block" />
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-taupe/45 bg-cream/80 shadow-[0_0_0_6px_rgba(250,248,241,0.65)]">
              <span className="font-serif text-2xl font-light text-botanical">&amp;</span>
            </div>
            <div className="hidden h-16 w-px bg-gradient-to-b from-transparent via-taupe/60 to-transparent md:block" />
          </div>

          <PersonCard
            label="Mempelai Pria"
            name={groom.name}
            relation="Putra dari"
            father={groom.parents.father}
            mother={groom.parents.mother}
            align="right"
            delay={1}
          />
        </div>
      </div>
    </section>
  )
}
