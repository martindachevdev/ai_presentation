import { SlideCard } from './SlideCard'

export function DeckView({ slides, currentSlide }) {
  const slide = slides[currentSlide]

  return (
    <main className="presentation presentation--audience-dark">
      <SlideCard slide={slide} variant="fullscreen" showLinks={false} />
    </main>
  )
}
