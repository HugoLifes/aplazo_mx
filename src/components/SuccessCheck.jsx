// Palomita de éxito: el círculo aparece, el anillo y la palomita se "dibujan"
// y salen partículas. Toda la coreografía es GSAP.
import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'

const DOTS = 10

export default function SuccessCheck({ size = 92 }) {
  const ref = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.sc-fill', { scale: 0, transformOrigin: '50% 50%', duration: 0.55, ease: 'back.out(2.2)' })
      .fromTo('.sc-ring', { strokeDashoffset: 290 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 0.05)
      .fromTo('.sc-tick', { strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: 0.45, ease: 'power3.out' }, 0.32)
      .fromTo('.sc-dot',
        { x: 0, y: 0, scale: 0, opacity: 1 },
        {
          x: (i) => Math.cos((i / DOTS) * Math.PI * 2) * size * 0.72,
          y: (i) => Math.sin((i / DOTS) * Math.PI * 2) * size * 0.72,
          scale: (i) => (i % 2 ? 0.7 : 1),
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.012,
        }, 0.28)
      .to(ref.current, { scale: 1.06, yoyo: true, repeat: 1, duration: 0.18, ease: 'power1.inOut' }, 0.6)
  }, { scope: ref })

  return (
    <div className="success-check" ref={ref} style={{ width: size, height: size }}>
      {Array.from({ length: DOTS }, (_, i) => <i key={i} className="sc-dot" />)}
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle className="sc-fill" cx="50" cy="50" r="38" />
        <circle className="sc-ring" cx="50" cy="50" r="46" strokeDasharray="290" />
        <path className="sc-tick" d="M34 51l11 11 22-24" strokeDasharray="40" />
      </svg>
    </div>
  )
}
