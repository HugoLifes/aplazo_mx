// Número que "cuenta" hasta su valor (GSAP). Si el valor cambia, anima del actual al nuevo.
import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'
import { money } from '../lib/format.js'

export default function CountUp({ value, format = money, duration = 1.2, delay = 0, from = 0, className }) {
  const ref = useRef(null)
  const current = useRef(from)

  useGSAP(() => {
    const o = { v: current.current }
    gsap.to(o, {
      v: value,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        current.current = o.v
        if (ref.current) ref.current.textContent = format(o.v)
      },
    })
  }, { dependencies: [value] })

  return <span ref={ref} className={className}>{format(current.current)}</span>
}
