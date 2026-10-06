import { useEffect, useState, type FormEvent } from 'react'
import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { Reveal } from '../components/Reveal'
import { weddingData, type Wish } from '../data/weddingData'

const STORAGE_KEY = 'wedding-wishes'

function loadWishes(): Wish[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Wish[]
  } catch {
    return []
  }
}

function getAppsScriptUrl() {
  return (
    import.meta.env.VITE_APPS_SCRIPT_URL ||
    weddingData.wishes.appsScriptUrl
  ).trim()
}

function isSuccessFlag(value: unknown) {
  return value === true || value === 'true'
}

async function sendWishEmail(name: string, message: string) {
  const endpoint = getAppsScriptUrl()
  if (!endpoint) {
    throw new Error(
      'Pengiriman email belum siap. Pasang Google Apps Script (lihat scripts/SendWishEmail.gs), lalu tempel URL Web App ke weddingData.ts → appsScriptUrl.',
    )
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    // text/plain menghindari preflight CORS ke Google Apps Script
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ name, message }),
    redirect: 'follow',
  })

  const raw = await response.text()
  let data: { success?: boolean | string; message?: string } = {}
  try {
    data = JSON.parse(raw) as { success?: boolean | string; message?: string }
  } catch {
    // Apps Script kadang mengembalikan HTML redirect; anggap gagal jika bukan JSON sukses
    throw new Error('Respons server tidak valid. Pastikan Web App di-deploy dengan akses Anyone.')
  }

  if (!isSuccessFlag(data.success)) {
    throw new Error(data.message || 'Gagal mengirim ucapan ke email')
  }
}

export function Wishes() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [wishes, setWishes] = useState<Wish[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setWishes(loadWishes())
  }, [])

  const saveWishLocally = (wish: Wish) => {
    const next = [wish, ...wishes]
    setWishes(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim() || !message.trim()) {
      setError('Nama dan ucapan wajib diisi')
      return
    }

    const wish: Wish = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    }

    setSending(true)
    try {
      await sendWishEmail(wish.name, wish.message)
      saveWishLocally(wish)
      setName('')
      setMessage('')
      setSuccess('Ucapan terkirim. Terima kasih!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengirim ke email. Coba lagi beberapa saat.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="wishes" className="paper-texture bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-12 text-center">
          <SectionLabel>Buku Tamu</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            Ucapan Anda
          </h2>
          <p className="mt-4 font-sans text-sm font-light text-ink/65">{weddingData.wishes.message}</p>
          <DecorativeLine className="mt-6" />
        </Reveal>

        <Reveal delay={1}>
          <form onSubmit={(e) => void onSubmit(e)} className="mx-auto mb-16 max-w-md space-y-5">
            <label className="block">
              <span className="mb-2 block font-sans text-[10px] font-medium tracking-[0.2em] text-sage uppercase">
                Nama
              </span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={sending}
                className="w-full border border-taupe/70 bg-ivory px-4 py-3 text-ink outline-none focus:border-botanical disabled:opacity-60"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-sans text-[10px] font-medium tracking-[0.2em] text-sage uppercase">
                Ucapan
              </span>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                disabled={sending}
                className="w-full resize-y border border-taupe/70 bg-ivory px-4 py-3 text-ink outline-none focus:border-botanical disabled:opacity-60"
              />
            </label>
            {error && <p className="text-xs leading-relaxed text-red-700/80">{error}</p>}
            {success && <p className="text-xs text-botanical">{success}</p>}
            <button
              type="submit"
              disabled={sending}
              className="w-full border border-botanical px-6 py-3 font-sans text-[10px] font-medium tracking-[0.24em] text-botanical uppercase transition hover:bg-botanical hover:text-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? 'Mengirim...' : 'Kirim Ucapan'}
            </button>
          </form>
        </Reveal>

        <div className="space-y-10">
          {wishes.length === 0 ? (
            <p className="text-center font-serif text-lg font-light text-taupe italic">
              Jadilah yang pertama memberi ucapan.
            </p>
          ) : (
            wishes.map((wish, index) => (
              <Reveal key={wish.id} delay={(index % 3) as 0 | 1 | 2}>
                <blockquote className="border-t border-taupe/40 pt-8 text-center">
                  <p className="font-serif text-xl leading-relaxed font-light text-ink sm:text-2xl">
                    “{wish.message}”
                  </p>
                  <footer className="mt-4 font-sans text-[10px] tracking-[0.22em] text-sage uppercase">
                    — {wish.name}
                  </footer>
                </blockquote>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
