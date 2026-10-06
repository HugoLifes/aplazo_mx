// Pantalla de VERIFICACIÓN (código OTP) — decorativa, no valida nada real.
// ¿Cambiar textos o el aviso de demo? -> edita src/content.js (sección "otp").
// ¿Cambiar el diseño de las casillas? -> edita src/styles.css (busca ".otp-cell").
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow, Spark, Check } from '../components/Icons.jsx'
import { otp as t } from '../content.js'

function formatPhone(v) {
  const d = v.replace(/\D/g, '')
  if (d.length < 10) return v
  return `55 •••• ${d.slice(6, 10)}`
}

export default function OtpStep({ phone, onBack, onNext }) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [phase, setPhase] = useState('idle') // idle | verifying | done
  const refs = useRef([])
  const filled = code.every((c) => c !== '')

  const setDigit = (i, val) => {
    const d = val.replace(/\D/g, '').slice(-1)
    const next = [...code]
    next[i] = d
    setCode(next)
    if (d && i < 5) refs.current[i + 1]?.focus()
  }

  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) refs.current[i - 1]?.focus()
  }

  // Helper de demo: rellena un código de ejemplo (no funcional)
  const autofill = () => {
    setCode(['1', '2', '3', '4', '5', '6'])
    refs.current[5]?.focus()
  }

  // Tiempos de la animación (en milisegundos). Cámbialos si quieres más rápido/lento.
  const verify = () => {
    setPhase('verifying')
    setTimeout(() => setPhase('done'), 1500)   // muestra el ✓ a los 1.5 s
    setTimeout(() => onNext(), 2700)           // entra al dashboard a los 2.7 s
  }

  const descripcion = t.descripcion.replace('{telefono}', formatPhone(phone) || 'tu número')

  if (phase !== 'idle') {
    return (
      <div className="screen-body">
        <AnimatePresence mode="wait">
          {phase === 'verifying' ? (
            <motion.div key="v" className="verify-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="spinner" />
              <div>
                <h3>{t.verificandoTitulo}</h3>
                <p>{t.verificandoSub}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="d" className="verify-wrap" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.div className="success-ring" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
                <div className="inner"><Check style={{ width: 30, height: 30 }} /></div>
              </motion.div>
              <div>
                <h3>{t.exitoTitulo}</h3>
                <p>{t.exitoSub}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="screen-body">
      <div className="progress"><i className="on" /><i className="on" /><i className="on" /><i /></div>

      <header className="screen-head">
        <span className="eyebrow">{t.paso}</span>
        <h2 className="display">{t.titulo}</h2>
        <p className="lead">{descripcion}</p>
      </header>

      <div className="otp-row">
        {code.map((c, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            className={`otp-cell ${c ? 'filled' : ''}`}
            inputMode="numeric"
            maxLength={1}
            value={c}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => onKey(i, e)}
            aria-label={`Dígito ${i + 1}`}
          />
        ))}
      </div>

      <div className="otp-resend">
        <span className="btn-link">{t.reenviar}<b>{t.reenviarTiempo}</b></span>
      </div>

      <div className="hint">
        <Spark style={{ width: 18, height: 18, flexShrink: 0 }} />
        <div>
          <b>{t.demoEtiqueta}</b> {t.demoTexto}
          <b onClick={autofill} style={{ cursor: 'pointer', textDecoration: 'underline' }}>{t.demoResalte}</b>
          {t.demoTextoFin}
        </div>
      </div>

      <div className="spacer" />
      <div className="cta-bar">
        <button className="btn ghost" onClick={autofill}>
          {t.botonRellenar}
        </button>
        <button className="btn" disabled={!filled} onClick={verify}>
          {t.botonVerificar} <Arrow />
        </button>
        <button className="btn-link" onClick={onBack}>
          {t.botonCambiar}
        </button>
      </div>
    </div>
  )
}
