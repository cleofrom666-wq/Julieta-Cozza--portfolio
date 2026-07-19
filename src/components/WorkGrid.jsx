import { motion } from 'framer-motion'
import PlaceholderImage from './PlaceholderImage.jsx'

const SPANS = ['a', 'b', 'c', 'd']

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function WorkGrid({ categories, lang, onOpen }) {
  return (
    <div className="work-grid">
      {categories.map((category, i) => {
        const label = category.label[lang]
        const count = category.projects?.length || 0
        return (
          <motion.button
            key={category.id}
            className={`work-card work-card--${SPANS[i % SPANS.length]}`}
            onClick={() => onOpen(category.id)}
            data-cursor={lang === 'es' ? 'Ver' : 'View'}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            custom={i}
          >
            <span className="work-card__media">
              <PlaceholderImage
                src={category.image}
                alt={label}
                label={`imagen/video: ${category.id}`}
              />
            </span>
            <span className="work-card__scrim" />
            <span className="work-card__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="work-card__content">
              <span className="work-card__title">{label}</span>
              <span className="work-card__meta">
                {count} {lang === 'es' ? (count === 1 ? 'pieza' : 'piezas') : count === 1 ? 'piece' : 'pieces'}
              </span>
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
