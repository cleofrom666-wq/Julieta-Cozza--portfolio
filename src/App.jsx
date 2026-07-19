import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, site } from './data/categories.js'
import Cursor from './components/Cursor.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import WorkGrid from './components/WorkGrid.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import CategoryNav from './components/CategoryNav.jsx'
import CategoryView from './components/CategoryView.jsx'
import Footer from './components/Footer.jsx'
import useLenis from './lib/useLenis.js'

const HERO_REEL = categories.find((c) => c.id === 'demoreel')?.projects?.[0]?.image
// The demo reel doubles as the hero's atmosphere, so it isn't repeated
// as its own tile in the work grid below.
const gridCategories = categories.filter((c) => c.id !== 'demoreel')

export default function App() {
  const [activeId, setActiveId] = useState(null)
  const [lang, setLang] = useState('es')
  const workRef = useRef(null)
  useLenis()

  const active = categories.find((c) => c.id === activeId)
  const activeIndex = gridCategories.findIndex((c) => c.id === activeId)

  const openCategory = (id) => {
    setActiveId(id)
    window.scrollTo(0, 0)
  }

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page">
      <div className="grain" aria-hidden="true" />
      <div className="letterbox letterbox--top" aria-hidden="true" />
      <div className="letterbox letterbox--bottom" aria-hidden="true" />
      <Cursor />
      
      <Header lang={lang} onToggleLang={() => setLang(lang === 'es' ? 'en' : 'es')} />

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero reelSrc={HERO_REEL} lang={lang} name={site.name} onExplore={scrollToWork} />

            <section className="section" id="work" ref={workRef}>
              <div className="section__head">
                <span className="section__index">{lang === 'es' ? '01 · Trabajo seleccionado' : '01 · Selected work'}</span>
                <h2 className="section__title">{lang === 'es' ? 'Trabajo' : 'Work'}</h2>
              </div>
              <WorkGrid categories={gridCategories} lang={lang} onOpen={openCategory} />
            </section>

            <section className="section">
              <div className="section__head">
                <span className="section__index">{lang === 'es' ? '02 · Sobre mí' : '02 · About'}</span>
                <h2 className="section__title">{lang === 'es' ? 'Perfil' : 'Profile'}</h2>
              </div>
              <About lang={lang} />
            </section>

            <section className="section">
              <div className="section__head">
                <span className="section__index">{lang === 'es' ? '03 · Contacto' : '03 · Contact'}</span>
                <h2 className="section__title">{lang === 'es' ? 'Hablemos' : "Let's talk"}</h2>
              </div>
              <Contact lang={lang} />
            </section>
          </motion.main>
        ) : (
          <motion.main
            key="category"
            className="category-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CategoryNav
              categories={gridCategories}
              activeId={activeId}
              lang={lang}
              backLabel={site.backToHome[lang]}
              onSelect={openCategory}
              onBack={() => setActiveId(null)}
            />
            <CategoryView
              category={active}
              lang={lang}
              index={activeIndex === -1 ? 0 : activeIndex}
              total={gridCategories.length}
            />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer lang={lang} />

      {/* CV (PDF): pausado hasta actualizar el contenido (ver Bucket 6).
      Cuando esté listo, va a necesitar dos rutas (cvPdf.es / cvPdf.en)
      para que descargue el CV en el idioma activo — contact.cvPdf ya
      está definido en data/categories.js. */}
    </div>
  )
}
