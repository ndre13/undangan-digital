import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { Reveal } from '../components/Reveal'
import { weddingData } from '../data/weddingData'
import { useCountdown } from '../hooks/useCountdown'

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[64px] flex-col items-center sm:min-w-[80px]">
      <span className="font-serif text-4xl font-light tabular-nums text-botanical sm:text-5xl lg:text-6xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-2 font-sans text-[9px] font-medium tracking-[0.28em] text-sage uppercase sm:text-[10px]">
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const { days, hours, minutes, seconds, expired } = useCountdown(weddingData.date.iso)

  return (
    <section className="bg-ivory px-5 py-20 sm:px-8 sm:py-28" aria-live="polite">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionLabel>Menghitung Hari</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            Menuju Hari Bahagia
          </h2>
          <DecorativeLine className="mt-6" />
        </Reveal>

        <Reveal delay={1} className="mt-12 sm:mt-16">
          {expired ? (
            <p className="font-serif text-2xl font-light tracking-wide text-botanical sm:text-3xl">
              Terima kasih telah merayakan bersama kami
            </p>
          ) : (
            <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10">
              <Unit value={days} label="Hari" />
              <Unit value={hours} label="Jam" />
              <Unit value={minutes} label="Menit" />
              <Unit value={seconds} label="Detik" />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
