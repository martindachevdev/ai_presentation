import { SlideCard } from './SlideCard'

export function PresenterView({
  presentationTitle,
  slides,
  currentSlide,
  goToSlide,
  audienceUrl,
}) {
  const totalSlides = slides.length
  const slide = slides[currentSlide]
  const nextSlide = slides[Math.min(currentSlide + 1, totalSlides - 1)]

  return (
    <main className="presenter">
      <header className="presenter__top">
        <div>
          <p className="label">Режим за презентатор</p>
          <h1 className="presenter__deckTitle">{presentationTitle}</h1>
        </div>
        <div className="presenter__actions">
          <a
            className="presenter__link"
            href={audienceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Отвори прозорец за публика (нов таб)
          </a>
          <span className="presenter__meta">
            Синхронизация: два таба на същия адрес; навигацията се споделя автоматично.
          </span>
        </div>
      </header>

      <div className="presenter__grid">
        <aside className="presenter__slides">
          <div className="presenter__slideMeta">
            <span>
              Слайд {currentSlide + 1} / {totalSlides}
            </span>
            <span>{slide.duration}</span>
          </div>
          <SlideCard slide={slide} variant="compact" showLinks maxLinks={5} />
          {currentSlide < totalSlides - 1 ? (
            <div className="presenter__next">
              <p className="presenter__nextLabel">Следващ</p>
              <SlideCard slide={nextSlide} variant="compact" showLinks={false} />
            </div>
          ) : null}
          <footer className="presenter__controls">
            <button
              type="button"
              onClick={() => goToSlide((previous) => previous - 1)}
              disabled={currentSlide === 0}
            >
              Предишен
            </button>
            <button
              type="button"
              onClick={() => goToSlide((previous) => previous + 1)}
              disabled={currentSlide === totalSlides - 1}
            >
              Следващ
            </button>
          </footer>
        </aside>

        <section className="presenter__notes" aria-label="Бележки за говорене">
          <h2 className="presenter__notesHeading">Бележки (чети оттук)</h2>
          <div className="presenter__notesBody">
            {slide.notes.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </div>

      <p className="hint presenter__hint">
        Навигация: стрелки, PageUp/PageDown, Home/End (синхронизирано с прозореца за
        публика)
      </p>
    </main>
  )
}
