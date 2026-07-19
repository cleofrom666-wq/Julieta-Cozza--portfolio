import { site } from '../data/categories.js'

export default function Footer({ lang }) {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <span>
        © {year} {site.name}
      </span>
      <span>{lang === 'es' ? 'Editado en Buenos Aires' : 'Edited in Buenos Aires'}</span>
    </footer>
  )
}
