// Tarjeta de crédito disponible (pieza principal del dashboard).
// Datos: src/content.js -> dashboard.tarjeta · Estilos: styles.css -> ".credit-card"
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrandMark } from './Logo.jsx'

const ease = [0.22, 1, 0.36, 1]

export default function CreditCard({ data: t }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="credit-card"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      {/* Detalles gráficos: anillos y brillo que cruza una vez */}
      <svg className="cc-rings" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="200" cy="0" r="70" />
        <circle cx="200" cy="0" r="110" />
        <circle cx="200" cy="0" r="150" />
      </svg>
      <motion.span
        className="cc-sheen"
        initial={{ x: '-120%' }}
        animate={{ x: '220%' }}
        transition={{ delay: 0.5, duration: 1.4, ease: 'easeInOut' }}
      />

      <div className="cc-row">
        <span className="cc-brand"><BrandMark size={16} /> {t.marca}</span>
        <span className="cc-waves" aria-hidden="true"><b /><b /><b /></span>
      </div>

      <div className="cc-label">{t.etiqueta}</div>
      <div className="cc-amount">{t.monto}</div>
      <div className="cc-sub">{t.sub}</div>

      <div className="cc-meter">
        <div className="bar">
          <motion.i initial={{ width: 0 }} animate={{ width: `${t.porcentajeUsado}%` }} transition={{ delay: 0.35, duration: 0.9, ease }} />
        </div>
        <div className="row"><span>{t.usado}</span><span>{t.libre}</span></div>
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
              {t.numero.map((n, i) => <span key={i}>{n}</span>)}
            </div>
            <div className="cc-foot">
              <div><div className="k">{t.titularEtiqueta}</div><div className="v">{t.titular}</div></div>
              <div><div className="k">{t.desdeEtiqueta}</div><div className="v">{t.desde}</div></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="cc-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        whileTap={{ scale: 0.96 }}
      >
        {open ? t.botonOcultar : t.botonDetalle}
        <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
          animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.button>
    </motion.div>
  )
}
