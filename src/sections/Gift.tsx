import { Check, Copy, Gift as GiftIcon } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { DecorativeLine, SectionLabel } from '../components/Decorative'
import { Reveal } from '../components/Reveal'
import { weddingData } from '../data/weddingData'

type Account = (typeof weddingData.gift.accounts)[number]

function CardPattern({ uid }: { uid: string }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 360 210"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g
        fill="none"
        stroke="#d8d2c8"
        strokeWidth="0.85"
        opacity="0.4"
        transform="translate(290 105)"
      >
        {[22, 38, 54, 70, 86, 102, 118, 134].map((r) => (
          <circle key={r} r={r} />
        ))}
      </g>
      <defs>
        <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="360" height="210" fill={`url(#fade-${uid})`} />
    </svg>
  )
}

function BsiLogo() {
  return (
    <div className="flex items-center gap-1" aria-hidden>
      <div className="text-right leading-[1.05]">
        <p className="font-card text-[14px] font-bold text-[#00a39d]">BSI</p>
        <p className="font-card text-[5px] font-semibold tracking-[0.01em] text-[#00a39d]">
          BANK SYARIAH
          <br />
          INDONESIA
        </p>
      </div>
      <svg width="12" height="12" viewBox="0 0 14 14" className="mb-0.5 shrink-0">
        <path d="M7 1L12.8 7 7 13 1.2 7Z" fill="#f5a623" />
        <path d="M7 3.6L10 7 7 10.4 4 7Z" fill="#00a39d" />
      </svg>
    </div>
  )
}

function BcaLogo() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#0056a4]">
        <span className="font-card text-[12px] leading-none font-bold text-white">B</span>
      </div>
      <div className="leading-[1.05]">
        <p className="font-card text-[14px] font-bold text-[#0056a4]">BCA</p>
        <p className="font-card text-[5px] font-semibold tracking-[0.03em] text-[#0056a4]/80">
          BANK CENTRAL ASIA
        </p>
      </div>
    </div>
  )
}

function CardChip() {
  return (
    <div
      className="relative h-[24px] w-[32px] overflow-hidden rounded-[3px] bg-linear-to-br from-[#efe0a8] via-[#d9b84e] to-[#c4a030]"
      aria-hidden
    >
      <div className="absolute inset-[2.5px] rounded-[1.5px] border border-[#a8892e]/40" />
      <div className="absolute top-1/2 right-[2px] left-[2px] h-px -translate-y-1/2 bg-[#a8892e]/45" />
      <div className="absolute top-[2px] bottom-[2px] left-1/2 w-px -translate-x-1/2 bg-[#a8892e]/45" />
    </div>
  )
}

function BankCard({ account }: { account: Account }) {
  const [copied, setCopied] = useState(false)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber)
      setCopied(true)
    } catch {
      const input = document.createElement('input')
      input.value = account.accountNumber
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
    }
  }

  return (
    <article
      className="relative w-full overflow-hidden rounded-[14px] bg-[#fafaf8] shadow-[0_4px_18px_rgba(48,53,46,0.1)]"
      style={{ aspectRatio: '1.72 / 1' }}
      aria-label={`Rekening ${account.bankFull} a.n. ${account.accountName}`}
    >
      <CardPattern uid={uid} />

      {/* Top row */}
      <div className="absolute top-[14px] right-[16px] left-[16px] flex items-start justify-between sm:top-[16px] sm:right-[18px] sm:left-[18px]">
        <CardChip />
        {account.bank === 'BSI' ? <BsiLogo /> : <BcaLogo />}
      </div>

      {/* Nomor + nama digabung seperti kartu debit */}
      <div className="absolute right-[16px] bottom-[18px] left-[16px] sm:right-[18px] sm:bottom-[20px] sm:left-[18px]">
        <p className="font-card text-[1.35rem] leading-none font-semibold tracking-[0.05em] text-[#3a3a3a] tabular-nums sm:text-[1.5rem]">
          {account.accountNumber}
        </p>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <p className="min-w-0 truncate font-card text-[10.5px] font-medium tracking-[0.1em] text-[#8a8a8a] uppercase sm:text-[11px]">
            {account.accountName}
          </p>
          <button
            type="button"
            onClick={() => void onCopy()}
            className={`inline-flex shrink-0 items-center gap-1 rounded-[5px] px-2 py-[5px] font-card text-[9.5px] font-medium text-white transition-colors duration-200 ${
              copied ? 'bg-botanical' : 'bg-[#6c6c6c] hover:bg-[#555]'
            }`}
            aria-label={`Salin nomor rekening ${account.bank}`}
          >
            {copied ? (
              <>
                <Check size={11} strokeWidth={2.4} aria-hidden />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy size={11} strokeWidth={2} aria-hidden />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export function Gift() {
  const [open, setOpen] = useState(false)
  const { gift } = weddingData

  return (
    <section id="gift" className="paper-texture bg-ivory px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-10 text-center sm:mb-12">
          <SectionLabel>Tanda Kasih</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-ink sm:text-4xl">
            Wedding Gift
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed font-light text-ink/65">
            {gift.message}
          </p>
          <DecorativeLine className="mt-6" />
        </Reveal>

        <Reveal delay={1} className="flex justify-center">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="gift-accounts"
            className={`group inline-flex min-h-12 items-center gap-2.5 border px-7 py-3 font-sans text-[10px] font-medium tracking-[0.24em] uppercase transition-all duration-300 ease-out active:scale-[0.98] sm:min-h-11 ${
              open
                ? 'border-botanical bg-botanical text-cream shadow-[0_8px_24px_rgba(64,85,65,0.22)]'
                : 'border-botanical bg-transparent text-botanical hover:bg-botanical hover:text-cream hover:shadow-[0_8px_24px_rgba(64,85,65,0.18)]'
            }`}
          >
            <GiftIcon
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6"
              aria-hidden
            />
            <span>{open ? 'Tutup Rekening' : 'Kirim Gift'}</span>
          </button>
        </Reveal>

        <div
          id="gift-accounts"
          className={`gift-panel ${open ? 'is-open' : ''}`}
          aria-hidden={!open}
        >
          <div className="gift-panel-inner mx-auto mt-10 grid w-full max-w-[640px] grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
            {gift.accounts.map((account, index) => (
              <div
                key={account.id}
                className="gift-card-item w-full"
                style={{ transitionDelay: open ? `${70 + index * 80}ms` : '0ms' }}
              >
                <BankCard account={account} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
