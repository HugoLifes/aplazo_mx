// Subir límite: pasos para llegar al objetivo + solicitud. Textos: hojas.limite
import { useRef, useState } from 'react'
import { Check } from '../components/Icons.jsx'
import CountUp from '../components/CountUp.jsx'
import SuccessCheck from '../components/SuccessCheck.jsx'
import { hojas } from '../content.js'
import { fill } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'

const t = hojas.limite
const META = 8

export default function LimitSheet({ racha }) {
  const [sent, setSent] = useState(false)
  const ref = useRef(null)

  useGSAP(() => {
    gsap.timeline({ delay: 0.12 })
      .from('[data-in]', { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,translate,rotate,scale,opacity,visibility' })
      .from('.limit-step', { x: 22, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, 0.15)
      .from('.limit-progress i', { width: 0, duration: 1, ease: 'power3.out' }, 0.3)
  }, { scope: ref, dependencies: [sent] })

  if (sent) {
    return (
      <div className="sheet-state" ref={ref}>
        <SuccessCheck size={92} />
        <h4 data-in>{t.enviado}</h4>
        <p data-in>{t.enviadoSub}</p>
      </div>
    )
  }

  return (
    <div ref={ref}>
      <div className="limit-hero" data-in>
        <span>{t.sub}</span>
        <b><CountUp value={t.objetivo} duration={1.3} delay={0.2} /></b>
      </div>

      <div className="limit-steps">
        {t.pasos.map((p, i) => {
          const hecho = p.progreso ? racha >= META : p.hecho
          return (
            <div key={i} className={`limit-step ${hecho ? 'done' : ''}`}>
              <span className="limit-ic">{hecho ? <Check /> : i + 1}</span>
              <div className="limit-txt">
                <b>{p.titulo}</b>
                <span>{fill(p.sub, { racha: Math.min(racha, META) })}</span>
                {p.progreso && <span className="limit-progress"><i style={{ width: `${Math.min(100, (racha / META) * 100)}%` }} /></span>}
              </div>
            </div>
          )
        })}
      </div>

      <button className="btn" data-in onClick={() => setSent(true)}>{t.boton}</button>
    </div>
  )
}
