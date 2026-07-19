import { useEffect, useRef, useState } from 'react'

// Any element that wants the "expanded" cursor sets data-cursor="label text".
// Kept as a single fixed-position element updated via rAF + direct style
// writes (no React state per mousemove) so it never causes a re-render storm.
export default function Cursor() {
  const ref = useRef(null)
  const labelRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(canHover)
    if (!canHover) return undefined

    document.body.classList.add('has-cursor')
    const el = ref.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let raf

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
    }

    const render = () => {
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (!target || !el) return
      el.classList.add('is-view')
      if (labelRef.current) labelRef.current.textContent = target.dataset.cursor || 'Ver'
    }
    const onOut = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (!target || !el) return
      el.classList.remove('is-view')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.body.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__ring">
        <span className="cursor__label" ref={labelRef} />
      </span>
    </div>
  )
}
