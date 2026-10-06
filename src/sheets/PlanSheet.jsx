// Detalle de una compra a plazos: calendario de los 4 pagos. Textos: hojas.plan
import { useRef } from 'react'
import { Check, Clock } from '../components/Icons.jsx'
import MerchantLogo from '../components/MerchantLogo.jsx'
import CountUp from '../components/CountUp.jsx'
import { hojas } from '../content.js'
import { addDays, dayMonth, fill, money } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'

const t = hojas.plan

export default function PlanSheet({ plan, onPay }) {
  const ref = useRef(null)
  const done = plan.pagados >= plan.total
  const pct = (plan.pagados / plan.total) * 100

  useGSAP(() => {
    gsap.timeline({ delay: 0.12 })
      .from('[data-in]', { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.05, clearProps: 'transform,translate,rotate,scale,opacity,visibility' })
      .from('.plan-bar i', { width: 0, duration: 0.9, ease: 'power3.out' }, 0.15)
      .from('.sched-row', { x: 20, autoAlpha: 0, duration: 0.5, stagger: 0.07 }, 0.2)
  }, { scope: ref })

  return (
    <div ref={ref}>
      <div className="plan-head" data-in>
        <MerchantLogo id={plan.comercio} size="md" fallback={plan.inicial} />
        <div>
          <span>{t.total}</span>
          <b><CountUp value={plan.monto * plan.total} duration={1} /></b>
        </div>
      </div>
      <div className="plan-bar" data-in><i style={{ width: `${pct}%` }} /></div>

      <h5 className="sheet-label" data-in>{t.calendario}</h5>
      <div className="sched">
        {Array.from({ length: plan.total }, (_, k) => {
          const estado = k < plan.pagados ? 'paid' : k === plan.pagados ? 'next' : 'todo'
          const fecha = addDays(plan.enDias + (k - plan.pagados) * 14)
          return (
            <div key={k} className={`sched-row ${estado}`}>
              <span className="sched-dot">{estado === 'paid' ? <Check /> : estado === 'next' ? <Clock /> : k + 1}</span>
              <div className="sched-txt">
                <b>Pago {k + 1}</b>
                <span>{dayMonth(fecha)}</span>
              </div>
              <span className="sched-tag">{estado === 'paid' ? t.pagado : estado === 'next' ? t.proximo : t.pendiente}</span>
              <b className="sched-amt">{money(plan.monto)}</b>
            </div>
          )
        })}
      </div>

      {done
        ? <p className="sheet-note" data-in>{t.liquidado}</p>
        : <button className="btn" data-in onClick={onPay}>{fill(t.adelantar, { monto: money(plan.monto) })}</button>}
    </div>
  )
}
