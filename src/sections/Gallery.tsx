import { useState } from 'react'
import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { Lightbox } from '../components/Lightbox'
import { Reveal } from '../components/Reveal'
import { weddingData } from '../data/weddingData'

type Photo = (typeof weddingData.gallery)[number]

function GalleryItem({
  photo,
  className = '',
  delay = 0,
  onOpen,
}: {
  photo: Photo
  className?: string
  delay?: 0 | 1 | 2 | 3
  onOpen: (photo: Photo) => void
}) {
  return (
    <Reveal delay={delay} className={`overflow-hidden ${className}`}>
      <button
        type="button"
        className="group relative h-full w-full cursor-zoom-in overflow-hidden"
        onClick={() => onOpen(photo)}
        aria-label={`Lihat ${photo.alt}`}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <span className="pointer-events-none absolute inset-0 bg-forest/0 transition duration-500 group-hover:bg-forest/12" />
      </button>
    </Reveal>
  )
}

export function Gallery() {
  const [active, setActive] = useState<Photo | null>(null)
  const photos = weddingData.gallery
  const hero = photos[0]
  const featured = photos.slice(1, 3)
  const grid = photos.slice(3, 9)
  const closing = photos[9]

  return (
    <section id="gallery" className="paper-texture bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center sm:mb-16">
          <SectionLabel>Kenangan</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            Galeri
          </h2>
          <DecorativeLine className="mt-6" />
        </Reveal>

        <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-4">
          {/* Featured hero */}
          <GalleryItem
            photo={hero}
            className="aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[2.2/1]"
            onOpen={setActive}
          />

          {/* Pair of portraits */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
            {featured.map((photo, index) => (
              <GalleryItem
                key={photo.src}
                photo={photo}
                delay={(index + 1) as 1 | 2}
                className="aspect-[3/4] sm:aspect-[4/5]"
                onOpen={setActive}
              />
            ))}
          </div>

          {/* Balanced mosaic */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-4">
            {grid.map((photo, index) => (
              <GalleryItem
                key={photo.src}
                photo={photo}
                delay={(index % 3) as 0 | 1 | 2}
                className="aspect-[3/4] sm:aspect-[4/5]"
                onOpen={setActive}
              />
            ))}
          </div>

          {/* Closing wide frame */}
          {closing && (
            <GalleryItem
              photo={closing}
              delay={1}
              className="aspect-[16/10] w-full sm:aspect-[21/9]"
              onOpen={setActive}
            />
          )}
        </div>
      </div>

      {active && (
        <Lightbox src={active.src} alt={active.alt} onClose={() => setActive(null)} />
      )}
    </section>
  )
}
