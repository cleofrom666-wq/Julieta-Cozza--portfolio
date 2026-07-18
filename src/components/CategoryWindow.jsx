import Media from './Media.jsx'

export default function CategoryWindow({ category, lang, onOpen, sizeClass }) {
  const label = category.label[lang]
  return (
    <button
      className={`window ${sizeClass}`}
      onClick={() => onOpen(category.id)}
      aria-label={`Abrir sección ${label}`}
    >
      <span className="window__body">
        <Media alt={label} label={`imagen/video: ${category.id}`} src={category.image} autoPlay />
        <span className="window__title">{label}</span>
      </span>
    </button>
  )
}