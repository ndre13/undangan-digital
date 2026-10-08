import { weddingData } from '../data/weddingData'

export function Footer() {
  const { groom, bride } = weddingData
  const year = new Date(weddingData.date.iso).getFullYear()

  return (
    <footer className="bg-forest px-5 py-12 text-center text-cream sm:px-8 sm:py-14">
      <p className="font-sans text-[10px] tracking-[0.2em] text-cream/60 uppercase">Dengan Cinta,</p>
      <p className="mt-2 font-script text-3xl text-cream">
        {bride.name} & {groom.name}
      </p>
      <p className="mt-6 font-sans text-[10px] tracking-[0.18em] text-cream/45">© {year}</p>
    </footer>
  )
}
