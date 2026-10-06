import { useEffect, useState } from 'react'

type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function getParts(targetIso: string): CountdownParts {
  const diff = new Date(targetIso).getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, expired: false }
}

export function useCountdown(targetIso: string): CountdownParts {
  const [parts, setParts] = useState(() => getParts(targetIso))

  useEffect(() => {
    setParts(getParts(targetIso))
    const id = window.setInterval(() => {
      setParts(getParts(targetIso))
    }, 1000)
    return () => window.clearInterval(id)
  }, [targetIso])

  return parts
}
