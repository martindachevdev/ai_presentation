import './SlideCard.css'

export function SlideCard({ slide, variant = 'default', showLinks = true }) {
  const isTitleSlide = slide.layout === 'title'
  const hasSideVisual = Boolean(slide.image || slide.logo)
  const isStackedTitleVisual =
    isTitleSlide && slide.visualPlacement === 'top' && hasSideVisual
  const bullets = Array.isArray(slide.bullets) ? slide.bullets : []
  const hasLinks = showLinks && Array.isArray(slide.links) && slide.links.length > 0

  const visualEl = slide.image ? (
    <div className="slideCard__imageWrap">
      <img
        className="slideCard__image"
        src={slide.image.src}
        alt={slide.image.alt}
        loading="eager"
        decoding="async"
      />
    </div>
  ) : slide.logo ? (
    <div className="slideCard__logoSideWrap">
      <img
        className="slideCard__logoSide"
        src={slide.logo.src}
        alt={slide.logo.alt}
        loading="eager"
        decoding="async"
      />
    </div>
  ) : null

  const textEl = (
    <>
      <h2 className="slideCard__title">{slide.title}</h2>
      <p className="slideCard__subtitle">{slide.subtitle}</p>
      {bullets.length > 0 ? (
        <ul className="slideCard__bullets">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {hasLinks ? (
        <div className="slideCard__links">
          <p className="slideCard__linksTitle">Линкове</p>
          <ul className="slideCard__linksList">
            {slide.links.map((item) => (
              <li key={item.url}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )

  return (
    <section
      className={`slideCard slideCard--${variant}${hasSideVisual ? ' slideCard--hasImage' : ''}${isTitleSlide ? ' slideCard--titleSlide' : ''}${isStackedTitleVisual ? ' slideCard--titleStacked' : ''}`}
    >
      {isStackedTitleVisual ? (
        <div className="slideCard__bodyStack">
          {visualEl}
          <div className="slideCard__content">{textEl}</div>
        </div>
      ) : hasSideVisual ? (
        <div className="slideCard__bodyRow">
          {visualEl}
          <div className="slideCard__content">{textEl}</div>
        </div>
      ) : (
        textEl
      )}
    </section>
  )
}
