import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const ref = useRef(null)
  const labelRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(canHover)
    if (!canHover) return

    document.body.classList.add('has-cursor')

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let raf

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY

      const target = document
        .elementFromPoint(x, y)
        ?.closest('[data-cursor]')

      if (target) {
        ref.current?.classList.add('is-view')

        if (labelRef.current) {
          labelRef.current.textContent =
            target.dataset.cursor || 'Ver'
        }
      } else {
        ref.current?.classList.remove('is-view')
      }
    }

    const render = () => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      document.body.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
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