import { useState } from 'react'
import { categories, contact, site } from './data/categories.js'
import CategoryWindow from './components/CategoryWindow.jsx'
import MiniMenu from './components/MiniMenu.jsx'
import CategoryView from './components/CategoryView.jsx'

export default function App() {
  const [activeId, setActiveId] = useState(null)
  const [lang, setLang] = useState('es') // 'es' | 'en'
  const active = categories.find((c) => c.id === activeId)

  return (
    <div className="page">
      <header className="site-header">
        <div>
          <span className="site-header__name">{site.name}</span>
          <span className="site-header__tagline">{site.tagline[lang]}</span>
        </div>
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label="Cambiar idioma / switch language"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </header>

      <main>
        {!active ? (
          <div className="collage" aria-label="Categorías">
            {categories.map((c) => (
              <CategoryWindow
                key={c.id}
                category={c}
                lang={lang}
                sizeClass={`window--${c.id}`}
                onOpen={setActiveId}
              />
            ))}
          </div>
        ) : (
          <>
            <MiniMenu
              categories={categories}
              activeId={activeId}
              lang={lang}
              backLabel={site.backToHome[lang]}
              onSelect={setActiveId}
              onBack={() => setActiveId(null)}
            />
            <CategoryView category={active} lang={lang} />
          </>
        )}
      </main>

      <footer className="site-footer">
        <a className="site-footer__link" href={contact.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a className="site-footer__link" href={`https://mailto:${contact.email}`} target="_blank" rel="noreferrer">
          Email
        </a>
        {/* CV (PDF): pausado hasta actualizar el contenido (ver Bucket 6).
        Cuando esté listo, va a necesitar dos rutas (cvPdf.es / cvPdf.en)
        para que descargue el CV en el idioma activo.
        <a className="site-footer__link site-footer__link--muted" href={contact.cvPdf}>
          CV (PDF)
        </a>
        */}
      </footer>
    </div>
  )
}
