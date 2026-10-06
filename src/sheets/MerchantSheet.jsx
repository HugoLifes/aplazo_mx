// Tienda: simulador de 4 pagos + código de compra con vencimiento. Textos: hojas.tienda
import { useEffect, useRef, useState } from 'react'
import { Copy } from '../components/Icons.jsx'
import MerchantLogo from '../components/MerchantLogo.jsx'
import CountUp from '../components/CountUp.jsx'
import { hojas } from '../content.js'
import { addDays, dayMonth, fill, money } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'

const t = hojas.tienda
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const randCode = () => `QNC-${Array.from({ length: 8 }, (_, i) => (i === 4 ? '-' : '') + CHARS[Math.floor(Math.random() * CHARS.length)]).join('')}`

export default function MerchantSheet({ merchant: m, credito }) {
  const max = Math.max(200, Math.floor(Math.min(credito, 6000) / 50) * 50)
  const [amount, setAmount] = useState(Math.min(1200, max))
  const [code, setCode] = useState(null)
  const [secs, setSecs] = useState(600)
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)
  const pago = amount / 4

  useGSAP(() => {
    gsap.from('[data-in]', { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.05, delay: 0.12, clearProps: 'transform,translate,rotate,scale,opacity,visibility' })
  }, { scope: ref, dependencies: [code] })

  // El código "se descifra" carácter por carácter
  useGSAP(() => {
    if (!code) return
    const els = gsap.utils.toArray('.code-char')
    els.forEach((el, i) => {
      const final = el.dataset.c
      if (final === '-') return
      const o = { n: 0 }
      gsap.to(o, {
        n: 10, duration: 0.5 + i * 0.05, ease: 'none',
        onUpdate: () => { el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)] },
        onComplete: () => { el.textContent = final; gsap.fromTo(el, { y: -4 }, { y: 0, duration: 0.3, ease: 'back.out(3)' }) },
      })
    })
  }, { scope: ref, dependencies: [code] })

  useEffect(() => {
    if (!code || secs <= 0) return
    const id = setTimeout(() => setSecs((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [code, secs])

  const copy = async () => {
    try { await navigator.clipboard.writeText(code) } catch { /* sin permiso de portapapeles */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div ref={ref}>
      <div className="merchant-hero" data-in>
        <span className="merchant-hero-logo"><MerchantLogo id={m.id} size="fill" /></span>
        <span className="merchant-hero-tag">{m.categoria} · {m.beneficio}</span>
      </div>

      {!code ? (
        <>
          <h5 className="sheet-label" data-in>{t.simulador}</h5>
          <div className="sim" data-in>
            <div className="sim-amount">{money(amount)}</div>
            <input
              type="range" min={200} max={max} step={50} value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              style={{ '--p': `${((amount - 200) / Math.max(1, max - 200)) * 100}%` }}
              aria-label={t.simulador}
            />
            <div className="sim-range"><span>{money(200)}</span><span>{money(max)}</span></div>
            <div className="sim-result">
              <span>{t.pagos}</span>
              <b><CountUp value={pago} duration={0.4} from={pago} /></b>
            </div>
            <p className="sim-note">{t.sinInteres}</p>
          </div>

          <h5 className="sheet-label" data-in>{t.calendario}</h5>
          <div className="mini-sched" data-in>
            {[0, 14, 28, 42].map((dias, i) => (
              <div key={i}><i className={i === 0 ? 'on' : ''} /><b>{money(pago)}</b><span>{i === 0 ? t.hoy : dayMonth(addDays(dias))}</span></div>
            ))}
          </div>

          <button className="btn" data-in onClick={() => { setCode(randCode()); setSecs(600) }}>{t.boton}</button>
        </>
      ) : (
        <div className="code-box">
          <h5 className="sheet-label" data-in>{t.codigoTitulo}</h5>
          <div className="code" data-in aria-label={code}>
            {code.split('').map((c, i) => <span key={i} className={`code-char ${c === '-' ? 'sep' : ''}`} data-c={c}>{c}</span>)}
          </div>
          <p className="sheet-note" data-in>{fill(t.codigoSub, { tienda: m.nombre })}</p>
          <div className="code-meta" data-in>
            <span>{t.vence} <b>{Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')}</b></span>
            <span>{money(amount)} · 4 × {money(pago)}</span>
          </div>
          <button className="btn ghost" data-in onClick={copy}><Copy /> {copied ? t.copiado : t.copiar}</button>
        </div>
      )}
    </div>
  )
}
