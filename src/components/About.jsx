import { motion } from 'framer-motion'
import { site } from '../data/categories.js'

export default function About({ lang }) {
  return (
    <motion.div
      className="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="about__lede">{site.about[lang]}</p>
      <div className="about__meta">
        <div>
          <strong>{lang === 'es' ? 'Base' : 'Based in'}</strong> — {site.location[lang]}
        </div>
        <div>
          <strong>{lang === 'es' ? 'Disciplina' : 'Craft'}</strong> —{' '}
          {lang === 'es' ? 'edición, color, dirección de IA' : 'editing, color, AI direction'}
        </div>
      </div>
    </motion.div>
  )
}
