// Escanear QR en tienda: cámara simulada -> código detectado -> compra aprobada.
// Textos y tienda detectada: hojas.escanear
import { useEffect, useRef, useState } from 'react'
import MerchantLogo from '../components/MerchantLogo.jsx'
import SuccessCheck from '../components/SuccessCheck.jsx'
import { hojas } from '../content.js'
import { fill, money } from '../lib/format.js'
import { getMerchant } from '../lib/merchants.js'
import { gsap, useGSAP } from '../lib/gsap.js'

const t = hojas.escanear

export default function ScanSheet({ credito, onBuy, onClose }) {
  const [step, setStep] = useState('scan') // scan | found | processing | done
  const ref = useRef(null)
  const m = getMerchant(t.comercio)
  const alcanza = credito >= t.monto

  // Láser que recorre el visor + esquinas que "respiran"
  useGSAP(() => {
    if (step !== 'scan') return
    gsap.fromTo('.scan-laser', { top: '6%' }, { top: '92%', duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.to('.scan-corner', { scale: 1.06, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.1 })
    gsap.from('.scan-qr rect', { autoAlpha: 0, duration: 0.3, stagger: { each: 0.01, from: 'random' }, delay: 0.3 })
  }, { scope: ref, dependencies: [step] })

  useGSAP(() => {
    if (step === 'found') {
      gsap.timeline()
        .to('.scan-frame', { scale: 0.9, borderColor: '#76c9a8', duration: 0.35, ease: 'power2.out' })
        .from('.scan-result', { y: 60, autoAlpha: 0, duration: 0.6, ease: 'expo.out' }, 0.1)
        .from('.scan-result [data-in]', { y: 12, autoAlpha: 0, stagger: 0.05, duration: 0.45 }, 0.25)
    }
    if (step === 'done') gsap.from('[data-in]', { y: 14, autoAlpha: 0, duration: 0.5, stagger: 0.06, delay: 0.35 })
  }, { scope: ref, dependencies: [step] })

  useEffect(() => {
    if (step !== 'scan') return
    const id = setTimeout(() => setStep('found'), 2600)
    return () => clearTimeout(id)
  }, [step])

  const buy = () => {
    setStep('processing')
    setTimeout(() => { onBuy(t.comercio, t.monto); setStep('done') }, 1500)
  }

  if (step === 'processing' || step === 'done') {
    return (
      <div className="sheet-state" ref={ref}>
        {step === 'processing' ? <div className="spinner light" /> : <SuccessCheck size={96} />}
        <h4 data-in>{step === 'processing' ? t.procesando : t.exito}</h4>
        {step === 'done' && (
          <>
            <p data-in>{fill(t.exitoSub, { pago: money(t.monto / 4) })}</p>
            <button className="btn lime" data-in onClick={onClose}>{t.listo}</button>
          </>
        )}
      </div>
    )
  }

  return (
    <div ref={ref} className="scan">
      <div className="scan-view">
        <div className="scan-frame">
          {['tl', 'tr', 'bl', 'br'].map((c) => <i key={c} className={`scan-corner ${c}`} />)}
          <svg className="scan-qr" viewBox="0 0 21 21" aria-hidden="true">
            {QR.map(([x, y], i) => <rect key={i} x={x} y={y} width="1" height="1" />)}
          </svg>
          {step === 'scan' && <span className="scan-laser" />}
        </div>
        <p className="scan-hint">{step === 'scan' ? t.apunta : t.detectado}</p>
      </div>

      {step === 'found' && (
        <div className="scan-result">
          <div className="scan-merchant" data-in>
            <MerchantLogo id={m.id} size="md" />
            <div><b>{m.nombre}</b><span>{t.concepto}</span></div>
            <b className="scan-total">{money(t.monto)}</b>
          </div>
          <div className="scan-split" data-in>
            {[0, 1, 2, 3].map((i) => <span key={i}><b>{money(t.monto / 4)}</b><em>{i === 0 ? '14 días' : `${(i + 1) * 14} días`}</em></span>)}
          </div>
          {alcanza
            ? <button className="btn lime" data-in onClick={buy}>{t.boton}</button>
            : <p className="sheet-note warn" data-in>{t.sinCredito}</p>}
        </div>
      )}
    </div>
  )
}

// Patrón de QR decorativo (posiciones de los módulos)
const QR = (() => {
  const cells = []
  const finder = (ox, oy) => {
    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
      const edge = x === 0 || y === 0 || x === 6 || y === 6
      const core = x >= 2 && x <= 4 && y >= 2 && y <= 4
      if (edge || core) cells.push([ox + x, oy + y])
    }
  }
  finder(0, 0); finder(14, 0); finder(0, 14)
  let seed = 7
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
    const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)
    if (!inFinder && rnd() > 0.52) cells.push([x, y])
  }
  return cells
})()
