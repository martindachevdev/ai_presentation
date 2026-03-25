import { useCallback, useEffect, useRef, useState } from 'react'

const CHANNEL_NAME = 'ai-tools-presentation-sync'
const STORAGE_KEY = 'ai-tools-presentation-slide'

export function useSyncedSlide(totalSlides) {
  const channelRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return
      const raw = Number(event.newValue)
      if (Number.isNaN(raw)) return
      const next = Math.max(0, Math.min(raw, totalSlides - 1))
      setCurrentSlide((previous) => (previous === next ? previous : next))
    }

    window.addEventListener('storage', onStorage)

    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel(CHANNEL_NAME)
      channelRef.current = channel

      channel.onmessage = (event) => {
        const raw = event.data?.slide
        if (typeof raw !== 'number') return
        const next = Math.max(0, Math.min(raw, totalSlides - 1))
        setCurrentSlide((previous) => (previous === next ? previous : next))
      }
    }

    return () => {
      window.removeEventListener('storage', onStorage)
      channelRef.current?.close()
      channelRef.current = null
    }
  }, [totalSlides])

  const goToSlide = useCallback(
    (nextSlideOrUpdater) => {
      setCurrentSlide((previous) => {
        const raw =
          typeof nextSlideOrUpdater === 'function'
            ? nextSlideOrUpdater(previous)
            : nextSlideOrUpdater
        const next = Math.max(0, Math.min(raw, totalSlides - 1))
        localStorage.setItem(STORAGE_KEY, String(next))
        channelRef.current?.postMessage({ slide: next })
        return next
      })
    },
    [totalSlides],
  )

  return [currentSlide, goToSlide]
}
