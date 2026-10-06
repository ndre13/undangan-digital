import { X } from 'lucide-react'
import { useEffect } from 'react'

type LightboxProps = {
  src: string
  alt: string
  onClose: () => void
}

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-forest/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Gambar galeri"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-cream/80 transition hover:text-cream"
        aria-label="Tutup lightbox"
        onClick={onClose}
      >
        <X size={22} strokeWidth={1.5} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[88vh] max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
