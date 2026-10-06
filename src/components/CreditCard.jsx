// Tarjeta de crédito disponible (pieza principal del dashboard).
// Datos: src/content.js -> dashboard.tarjeta · Estilos: styles.css -> ".credit-card"
// GSAP: entrada en 3D, monto que cuenta, barra que se llena, brillo y tilt con el puntero.
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrandMark } from './Logo.jsx'
import CountUp from './CountUp.jsx'
import { brandCardLogoUrl, brandName } from '../lib/brand.js'
import { fill, money } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'

const ease = [0.22, 1, 0.36, 1]

export default function CreditCard({ data: t, disponible, titular }) {
  const [open, setOpen] = useState(false)
  const card = useRef(null)
  const usado = t.limite - disponible
  const pct = Math.max(0, Math.min(100, Math.round((disponible / t.limite) * 100)))

  // Entrada + tilt
  useGSAP(() => {
    gsap.timeline({ delay: 0.12 })
      .from(card.current, { y: 34, autoAlpha: 0, rotationX: 14, scale: 0.96, transformPerspective: 900, duration: 1.1, ease: 'expo.out' })
      .from('.cc-rings circle', { scale: 0.3, autoAlpha: 0, svgOrigin: '200 0', duration: 1.4, stagger: 0.1, ease: 'expo.out' }, 0.1)
      .from('.cc-row, .cc-label, .cc-sub, .cc-meter .row, .cc-toggle', { y: 10, autoAlpha: 0, duration: 0.6, stagger: 0.05 }, 0.25)
      .fromTo('.cc-sheen', { xPercent: -160 }, { xPercent: 420, duration: 1.6, ease: 'power2.inOut' }, 0.7)

    if (!window.matchMedia('(hover: hover)').matches) return
    const el = card.current
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    const gx = gsap.quickTo('.cc-glare', 'xPercent', { duration: 0.6, ease: 'power3.out' })
    const gy = gsap.quickTo('.cc-glare', 'yPercent', { duration: 0.6, ease: 'power3.out' })
    gsap.set(el, { transformPerspective: 900 })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      ry(px * 9); rx(-py * 7); gx(px * 60); gy(py * 60)
    }
    const leave = () => { rx(0); ry(0); gx(0); gy(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, { scope: card })

  // La barra sigue al crédito disponible (también al pagar o comprar)
  useGSAP(() => {
    gsap.to('.cc-meter .bar i', { width: `${pct}%`, duration: 1.1, delay: 0.35, ease: 'power3.out' })
  }, { scope: card, dependencies: [pct] })

  return (
    <div className="credit-card" ref={card}>
      <svg className="cc-rings" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="200" cy="0" r="70" />
        <circle cx="200" cy="0" r="110" />
        <circle cx="200" cy="0" r="150" />
      </svg>
      <span className="cc-sheen" aria-hidden="true" />
      <span className="cc-glare" aria-hidden="true" />

      <div className="cc-row">
        {brandCardLogoUrl
          ? <img className="cc-brand-img" src={brandCardLogoUrl} alt={brandName} />
          : <span className="cc-brand"><BrandMark size={16} /> {t.marca}</span>}
        <span className="cc-waves" aria-hidden="true"><b /><b /><b /></span>
      </div>

      <div className="cc-label">{t.etiqueta}</div>
      <div className="cc-amount"><CountUp value={disponible} delay={0.35} duration={1.4} /></div>
      <div className="cc-sub">{fill(t.subLimite, { limite: money(t.limite) })}</div>

      <div className="cc-meter">
        <div className="bar"><i /></div>
        <div className="row"><span>{fill(t.usado, { usado: money(usado) })}</span><span>{fill(t.libre, { pct })}</span></div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            className="cc-detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="cc-number">
              {t.numero.map((n, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>{n}</motion.span>
              ))}
            </div>
            <div className="cc-foot">
              <div><div className="k">{t.titularEtiqueta}</div><div className="v">{titular}</div></div>
              <div><div className="k">{t.desdeEtiqueta}</div><div className="v">{t.desde}</div></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button type="button" className="cc-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {open ? t.botonOcultar : t.botonDetalle}
        <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
          animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
    </div>
  )
}
