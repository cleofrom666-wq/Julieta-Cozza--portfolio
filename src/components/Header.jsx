import { useEffect, useState } from 'react'
import { site } from '../data/categories.js'

function formatTimecode(date) {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  const f = String(Math.floor(date.getMilliseconds() / 42)).padStart(2, '0')
  return `${h}:${m}:${s}:${f}`
}

export default function Header({ lang, onToggleLang }) {
  const [tc, setTc] = useState(() => formatTimecode(new Date()))
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setTc(formatTimecode(new Date())), 90)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
  const hero = document.querySelector('.hero')

  if (!hero) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      setShowInfo(!entry.isIntersecting)
    },
    {
      threshold: 0.1,
    }
  )

  observer.observe(hero)

  return () => observer.disconnect()
}, [])

  return (
    <header className="site-header">
      <div className={`site-header__info ${showInfo ? 'visible' : ''}`}>
        <span className="site-header__name">{site.name}</span>
        <span className="site-header__tagline">{site.tagline[lang]}</span>
      </div>

      <div className="header__right">
        <span className="header__tc">{tc}</span>

        <button
          className="lang-toggle"
          onClick={onToggleLang}
          aria-label="Cambiar idioma"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </header>
  )
}