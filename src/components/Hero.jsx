import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const YOUTUBE_PREFIX = 'youtube:'

function getYouTubeId(src) {
  if (!src) return null
  if (src.startsWith(YOUTUBE_PREFIX)) return src.slice(YOUTUBE_PREFIX.length)
  const match = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

// A chromeless, cropped-to-cover looping background embed. No player UI —
// this is atmosphere, not a video the visitor is meant to operate.
function HeroBackground({ src }) {
  const id = getYouTubeId(src)
  if (!id) return null
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: id,
    controls: '0',
    disablekb: '1',
    modestbranding: '1',
    playsinline: '1',
    rel: '0',
    iv_load_policy: '3',
  })
  return (
    <div className="hero__yt-crop" aria-hidden="true">
      <iframe
        src={`https://www.youtube.com/embed/${id}?${params.toString()}`}
        title="Reel"
        frameBorder="0"
        allow="autoplay; encrypted-media"
      />
    </div>
  )
}

export default function Hero({ reelSrc, lang, name, onExplore }) {
  const titleRef = useRef(null)
  const eyebrowRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = titleRef.current ? titleRef.current.querySelectorAll('.line span') : []
    const eyebrow = eyebrowRef.current

    if (reduceMotion) {
      gsap.set(lines, { yPercent: 0 })
      gsap.set(eyebrow, { opacity: 1 })
      return undefined
    }

    gsap.set(lines, { yPercent: 110 })
    gsap.set(eyebrow, { opacity: 0, y: 10 })

    const tl = gsap.timeline({ delay: 0.5, defaults: { ease: 'power4.out' } })
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8 })
      .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.08 }, '-=0.4')

    return () => tl.kill()
  }, [])

  const title = lang === 'es' ? ['Edito lo que', 'no se puede decir.'] : ['I edit what', "can't be said."]

  return (
    <section className="hero">
      <div className="hero__media">
        <HeroBackground src={reelSrc} />
      </div>
      <div className="hero__scrim" />

      <div className="hero__frame">
        <div className="hero__slate">
          <span className="hero__rec">
            <span className="dot" />
            {lang === 'es' ? 'GRABANDO' : 'RECORDING'}
          </span>
          <span>{lang === 'es' ? 'ROLLO 01 · REEL' : 'ROLL 01 · REEL'}</span>
        </div>

        <div className="hero__body">
          <p className="hero__eyebrow" ref={eyebrowRef}>
            {name} — {lang === 'es' ? 'editora de video & filmmaker' : 'video editor & filmmaker'}
          </p>
          <h1 className="hero__title" ref={titleRef}>
            {title.map((line) => (
              <span className="line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>

          <div className="hero__foot">
            <p className="hero__role">
              {lang === 'es'
                ? 'Bodas, videoclips, redes sociales y piezas hechas con inteligencia artificial.'
                : 'Weddings, music videos, social media and AI-assisted work.'}
            </p>
            <button className="hero__scroll" onClick={onExplore} data-cursor={lang === 'es' ? 'Bajar' : 'Scroll'}>
              <span className="hero__scroll-line" />
              {lang === 'es' ? 'Ver trabajo' : 'See work'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
