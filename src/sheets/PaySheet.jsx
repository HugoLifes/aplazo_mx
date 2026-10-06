// Hoja "Pagar quincena": elegir método -> procesando -> éxito. Textos: hojas.pagar
import { useRef, useState } from 'react'
import { Icon } from '../components/Icons.jsx'
import MerchantLogo from '../components/MerchantLogo.jsx'
import SuccessCheck from '../components/SuccessCheck.jsx'
import { hojas } from '../content.js'
import { fill, money, randomCode } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'

const t = hojas.pagar

export default function PaySheet({ plan: initial, onConfirm, onClose }) {
  const [plan] = useState(initial)          // foto del pago al abrir (el estado global cambia al pagar)
  const [method, setMethod] = useState(t.metodos[0].id)
  const [step, setStep] = useState('choose') // choose | processing | done
  const [folio] = useState(() => `QC${randomCode(8)}`)
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from('[data-in]', { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.06, delay: 0.12, clearProps: 'transform,translate,rotate,scale,opacity,visibility' })
  }, { scope: ref, dependencies: [step] })

  const pay = () => {
    setStep('processing')
    setTimeout(() => { onConfirm(plan.id); setStep('done') }, 1500)
  }

  if (step === 'processing') {
    return (
      <div className="sheet-state" ref={ref}>
        <div className="spinner" />
        <p data-in>{t.procesando}</p>
      </div>
    )
  }

  if (step === 'done') {
    return (
      <div className="sheet-state" ref={ref}>
        <SuccessCheck size={96} />
        <h4 data-in>{t.exito}</h4>
        <p data-in>{t.exitoSub}</p>
        <div className="receipt" data-in>
          <div><span>{plan.nombre}</span><b>{money(plan.monto)}</b></div>
          <div><span>{t.folio}</span><b>{folio}</b></div>
        </div>
        <button className="btn" data-in onClick={onClose}>{t.listo}</button>
      </div>
    )
  }

  return (
    <div ref={ref}>
      <div className="pay-summary" data-in>
        <MerchantLogo id={plan.comercio} size="md" fallback={plan.inicial} />
        <div>
          <span>{plan.nombre} · Pago {plan.pagados + 1} de {plan.total}</span>
          <b>{money(plan.monto)}</b>
        </div>
      </div>

      <h5 className="sheet-label" data-in>{t.metodoTitulo}</h5>
      <div className="options" role="radiogroup" aria-label={t.metodoTitulo}>
        {t.metodos.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={method === m.id}
            className={`option ${method === m.id ? 'on' : ''}`}
            onClick={() => setMethod(m.id)}
            data-in
          >
            <span className="option-ic"><Icon name={m.icon} /></span>
            <span className="option-txt"><b>{m.titulo}</b><span>{m.sub}</span></span>
            <span className="radio" />
          </button>
        ))}
      </div>

      <button className="btn" data-in onClick={pay}>{fill(t.boton, { monto: money(plan.monto) })}</button>
    </div>
  )
}
