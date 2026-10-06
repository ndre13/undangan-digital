import { weddingData } from '../data/weddingData'
import { Reveal } from '../components/Reveal'

export function ThankYou() {
  const { groom, bride, date, thankYou } = weddingData

  return (
    <section
      id="thank-you"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-28 sm:min-h-[80vh] sm:px-8"
    >
      <img
        src={thankYou.background}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-botanical/85" />

      <Reveal className="relative z-10 mx-auto max-w-lg text-center text-cream">
        <p className="font-sans text-[10px] font-medium tracking-[0.32em] uppercase opacity-75">
          Terima Kasih
        </p>
        <p className="mt-6 font-serif text-2xl leading-relaxed font-light sm:text-3xl">
          {thankYou.message}
        </p>

        <div className="mt-10">
          <p className="font-script text-5xl sm:text-6xl">{groom.name}</p>
          <p className="my-1 font-serif text-xl font-light opacity-70">&</p>
          <p className="font-script text-5xl sm:text-6xl">{bride.name}</p>
        </div>

        <p className="mt-8 font-serif text-sm tracking-[0.28em] opacity-80">{date.short}</p>
      </Reveal>
    </section>
  )
}
