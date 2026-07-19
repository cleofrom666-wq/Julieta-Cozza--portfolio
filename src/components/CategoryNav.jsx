export default function CategoryNav({ categories, activeId, lang, backLabel, onSelect, onBack }) {
  return (
    <nav className="category-nav" aria-label="Secciones">
      <button className="category-nav__back" onClick={onBack} data-cursor={lang === 'es' ? 'Inicio' : 'Home'}>
        {backLabel}
      </button>
      <span className="category-nav__divider" aria-hidden="true" />
      <ul className="category-nav__list">
        {categories.map((c) => (
          <li key={c.id}>
            <button
              className={`category-nav__item ${c.id === activeId ? 'is-active' : ''}`}
              onClick={() => onSelect(c.id)}
            >
              {c.label[lang]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
