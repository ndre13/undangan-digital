import { weddingData } from '../data/weddingData'

type CoverProps = {
  onOpen: () => void
  isOpen: boolean
}

export function Cover({ onOpen, isOpen }: CoverProps) {
  if (isOpen) return null

  const { groom, bride, date, cover } = weddingData

  return (
    <section
      id="cover"
      className="fixed inset-0 z-[70] flex min-h-[100dvh] items-center justify-center overflow-hidden"
      aria-label="Pembuka undangan"
    >
      <img
        src={cover.background}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="editorial-overlay absolute inset-0" />

      <div className="cover-enter relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 py-10 text-center text-cream">
        <p className="font-sans text-[10px] font-medium tracking-[0.35em] uppercase opacity-80">
          Undangan Pernikahan
        </p>

        <div className="mt-5 sm:mt-8">
          <h1 className="font-script text-[2.75rem] leading-none sm:text-6xl md:text-7xl">
            {bride.name}
          </h1>
          <p className="my-1 font-serif text-xl font-light tracking-[0.15em] opacity-80 sm:my-2 sm:text-3xl">
            &
          </p>
          <h1 className="font-script text-[2.75rem] leading-none sm:text-6xl md:text-7xl">
            {groom.name}
          </h1>
        </div>

        <p className="mt-5 font-serif text-sm tracking-[0.28em] opacity-90 sm:mt-8 sm:text-base">
          {date.short}
        </p>

        <p className="mt-4 max-w-xs whitespace-pre-line font-sans text-xs leading-relaxed font-light tracking-wide text-cream/75 sm:mt-6 sm:text-sm">
          {cover.subtitle}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="mt-7 border border-cream/40 px-6 py-2.5 font-sans text-[10px] font-medium tracking-[0.28em] text-cream uppercase transition hover:bg-cream/10 sm:mt-10 sm:px-7"
        >
          Buka Undangan
        </button>
      </div>
    </section>
  )
}
