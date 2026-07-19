import { useEffect, useState } from 'react'
import { site } from '../data/categories.js'

function formatTimecode(date) {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  const f = String(Math.floor(date.getMilliseconds() / 42)).padStart(2, '0') // ~24fps
  return `${h}:${m}:${s}:${f}`
}

export default function Header({ lang, onToggleLang }) {
  const [tc, setTc] = useState(() => formatTimecode(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTc(formatTimecode(new Date())), 90)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="site-header">
      <div>
        <span className="site-header__name">{site.name}</span>
        <span className="site-header__tagline">{site.tagline[lang]}</span>
      </div>
      <div className="header__right">
        <span className="header__tc" aria-hidden="true">
          {tc}
        </span>
        <button
          className="lang-toggle"
          onClick={onToggleLang}
          aria-label="Cambiar idioma / switch language"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </header>
  )
}
