import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { href: '#home', label: 'Beranda' },
  { href: '#couple', label: 'Mempelai' },
  { href: '#story', label: 'Kisah' },
  { href: '#event', label: 'Acara' },
  { href: '#gallery', label: 'Galeri' },
]

type NavigationProps = {
  invitationOpen: boolean
}

export function Navigation({ invitationOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!invitationOpen) return null

  const barClass = scrolled
    ? 'bg-cream/95 text-ink shadow-[0_1px_0_rgba(64,85,65,0.08)] backdrop-blur-md'
    : 'bg-transparent text-cream'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${barClass}`}
      >
        <nav
          className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-8"
          aria-label="Navigasi utama"
        >
          <a
            href="#home"
            className="font-serif text-sm tracking-[0.2em] uppercase opacity-90 transition hover:opacity-100"
          >
            A & L 
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.22em] opacity-80 transition hover:opacity-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-forest/98 transition-opacity duration-400 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none invisible opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8" aria-label="Navigasi seluler">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-serif text-2xl tracking-[0.18em] text-cream uppercase"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
