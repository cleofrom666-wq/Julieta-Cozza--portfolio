export default function PlaceholderImage({ src, alt, label }) {
  if (src) {
    return <img className="media" src={src} alt={alt} loading="lazy" />
  }
  // Sin imagen real todavía: mostramos un patrón placeholder con el nombre
  // de lo que va a ir ahí, para que sea fácil de ubicar y reemplazar.
  return (
    <div className="media media--placeholder" role="img" aria-label={alt}>
      <span className="media__label">{label || 'reemplazar imagen'}</span>
    </div>
  )
}
