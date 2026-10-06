import { Pause, Play } from 'lucide-react'

type MusicPlayerProps = {
  playing: boolean
  onToggle: () => void
}

export function MusicPlayer({ playing, onToggle }: MusicPlayerProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? 'Jeda musik' : 'Putar musik'}
      className="fixed right-4 bottom-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-botanical/20 bg-cream/95 text-botanical shadow-[0_8px_24px_rgba(48,53,46,0.12)] backdrop-blur-sm transition hover:bg-ivory sm:right-6 sm:bottom-6"
    >
      {playing ? (
        <Pause size={16} strokeWidth={1.5} className="music-pulse" />
      ) : (
        <Play size={16} strokeWidth={1.5} className="ml-0.5" />
      )}
    </button>
  )
}
