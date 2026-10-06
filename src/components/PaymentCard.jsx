// Tarjeta "Próximo pago": toma la compra con el pago más cercano.
// Textos: dashboard.proximoPago
import { useRef } from 'react'
import MerchantLogo from './MerchantLogo.jsx'
import CountUp from './CountUp.jsx'
import { Check } from './Icons.jsx'
import { addDays, dueText, fill, monthShort } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'

export default function PaymentCard({ plan, labels: p, onPay, onSeePayments }) {
  const ref = useRef(null)

  // Cuando cambia el próximo pago (porque pagaste), el contenido entra deslizándose
  useGSAP(() => {
    gsap.from('.pay-swap', { x: 26, autoAlpha: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' })
    gsap.from('.pay-date', { rotationX: -90, transformPerspective: 400, duration: 0.7, ease: 'back.out(1.6)' })
  }, { scope: ref, dependencies: [plan?.id, plan?.pagados] })

  if (!plan) {
    return (
      <div className="pay-card is-done" data-reveal ref={ref}>
        <span className="pay-done-ic pay-swap"><Check /></span>
        <div className="pay-meta pay-swap"><b>{p.alDia}</b><span>{p.alDiaSub}</span></div>
      </div>
    )
  }

  const fecha = addDays(plan.enDias)

  return (
    <div className="pay-card" data-reveal ref={ref}>
      <div className="pay-top">
        <span className="pay-eyebrow"><i /> {p.titulo}</span>
        <div className="pay-date"><b>{fecha.getDate()}</b><span>{monthShort(fecha)}</span></div>
      </div>

      <div className="pay-main">
        <span className="pay-swap"><MerchantLogo id={plan.comercio} size="md" fallback={plan.inicial} /></span>
        <div className="pay-meta pay-swap">
          <b>{plan.nombre}</b>
          <span>{fill(p.sub, { n: plan.pagados + 1, total: plan.total, fecha: dueText(plan.enDias) })}</span>
        </div>
        <div className="pay-amount pay-swap"><CountUp value={plan.monto} duration={0.9} /></div>
      </div>

      <div className="pay-actions">
        <button type="button" className="pill ghost" onClick={onSeePayments}>{p.botonSecundario}</button>
        <button type="button" className="pill" onClick={onPay}>{p.boton}</button>
      </div>
    </div>
  )
}
