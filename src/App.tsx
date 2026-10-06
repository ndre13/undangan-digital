import { useCallback, useEffect, useRef, useState } from 'react'
import { MusicPlayer } from './components/MusicPlayer'
import { Navigation } from './components/Navigation'
import { Cover } from './sections/Cover'
import { Welcome } from './sections/Welcome'
import { Couple } from './sections/Couple'
import { OurStory } from './sections/OurStory'
import { WeddingDetails } from './sections/WeddingDetails'
import { Countdown } from './sections/Countdown'
import { TheDay } from './sections/TheDay'
import { Venue } from './sections/Venue'
import { Gallery } from './sections/Gallery'
import { Wishes } from './sections/Wishes'
import { ThankYou } from './sections/ThankYou'
import { Footer } from './sections/Footer'
import { weddingData } from './data/weddingData'

function App() {
  const [invitationOpen, setInvitationOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(weddingData.music.src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.45
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const openInvitation = useCallback(() => {
    setInvitationOpen(true)

    const audio = audioRef.current
    if (audio) {
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }

    window.requestAnimationFrame(() => {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  const toggleMusic = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }, [playing])

  return (
    <>
      <Cover onOpen={openInvitation} isOpen={invitationOpen} />

      {invitationOpen && (
        <div className="min-h-screen overflow-x-hidden">
          <Navigation invitationOpen={invitationOpen} />
          <main>
            <Welcome />
            <Couple />
            <OurStory />
            <WeddingDetails />
            <Countdown />
            <TheDay />
            <Venue />
            <Gallery />
            <Wishes />
            <ThankYou />
          </main>
          <Footer />
          <MusicPlayer playing={playing} onToggle={() => void toggleMusic()} />
        </div>
      )}
    </>
  )
}

export default App
