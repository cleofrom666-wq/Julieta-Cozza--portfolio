import { motion } from 'framer-motion'
import { contact } from '../data/categories.js'

export default function Contact({ lang }) {
  return (
    <motion.div
      className="contact__row"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <a className="contact__link" href={contact.whatsapp} target="_blank" rel="noreferrer" data-cursor="→">
        WhatsApp
      </a>
      <a className="contact__link" href={`mailto:${contact.email}`} data-cursor="→">
        {lang === 'es' ? 'Email' : 'Email'}
      </a>
    </motion.div>
  )
}
