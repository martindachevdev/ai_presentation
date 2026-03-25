import { useEffect, useMemo } from 'react'
import './App.css'
import { DeckView } from './DeckView'
import { PresenterView } from './PresenterView'
import { presentationTitle, slides } from './presentationData'
import { useSyncedSlide } from './useSyncedSlide'

function App() {
  const totalSlides = slides.length
  const [currentSlide, goToSlide] = useSyncedSlide(totalSlides)

  const isPresenter = useMemo(() => {
    return new URLSearchParams(window.location.search).get('mode') === 'presenter'
  }, [])

  const audienceUrl = useMemo(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete('mode')
    return url.toString()
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        goToSlide((previous) => Math.min(previous + 1, totalSlides - 1))
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        goToSlide((previous) => Math.max(previous - 1, 0))
      }
      if (event.key === 'Home') {
        goToSlide(0)
      }
      if (event.key === 'End') {
        goToSlide(totalSlides - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goToSlide, totalSlides])

  if (isPresenter) {
    return (
      <PresenterView
        presentationTitle={presentationTitle}
        slides={slides}
        currentSlide={currentSlide}
        goToSlide={goToSlide}
        audienceUrl={audienceUrl}
      />
    )
  }

  return <DeckView slides={slides} currentSlide={currentSlide} />
}

export default App
