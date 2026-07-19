import { motion } from 'framer-motion'
import Media from './Media.jsx'

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function CategoryView({ category, lang, index, total }) {
  const label = category.label[lang]
  const intro = category.intro ? category.intro[lang] : null

  return (
    <section className="category-view">
      <header className="category-view__header">
        <span className="category-view__index">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <h2 className="category-view__title">{label}</h2>
        {intro && <p className="category-view__intro">{intro}</p>}
      </header>

      <div className="category-view__list">
        {category.projects.map((p, i) => {
          const title = p.title ? p.title[lang] || p.title : null
          return (
            <motion.article
              className={`project project--${p.orientation || 'horizontal'}`}
              key={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Media
                alt={title || p.note || label}
                label={`imagen/video: ${p.note || title || category.id}-${i + 1}`}
                src={p.image}
                poster={p.poster}
                autoPlay={i === 0}
              />
              <p className="project__caption">
                {category.id === 'trabajo-artistico' ? (
                  <span className="project__year">{p.year}</span>
                ) : (
                  <>
                    <span>
                      <span className="project__title">{title}</span>
                      {p.year && <span className="project__year"> · {p.year}</span>}
                    </span>
                    {p.description ? (
                      <span className="project__description">{p.description[lang]}</span>
                    ) : null}
                  </>
                )}
              </p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
