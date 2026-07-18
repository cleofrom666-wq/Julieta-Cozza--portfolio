export default function MiniMenu({ categories, activeId, lang, backLabel, onSelect, onBack }) {
  return (
    <nav className="mini-menu" aria-label="Secciones">
      <button className="mini-menu__back" onClick={onBack} aria-label="Volver al inicio / back to home">
        {backLabel}
      </button>
      <ul className="mini-menu__list">
        {categories.map((c) => (
          <li key={c.id}>
            <button
              className={`mini-menu__item ${c.id === activeId ? 'is-active' : ''}`}
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
