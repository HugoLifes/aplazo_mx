import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Arrow, Spark, Check } from '../components/Icons.jsx'

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

  // Demo helper: fills a sample, non-functional code
  const autofill = () => {
    setCode(['1', '2', '3', '4', '5', '6'])
    refs.current[5]?.focus()
  }

  const verify = () => {
    setPhase('verifying')
    setTimeout(() => setPhase('done'), 1500)
    setTimeout(() => onNext(), 2700)
  }

  if (phase !== 'idle') {
    return (
      <div className="screen-body">
        <AnimatePresence mode="wait">
          {phase === 'verifying' ? (
            <motion.div key="v" className="verify-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="spinner" />
              <div>
                <h3>Verificando…</h3>
                <p>Estamos confirmando tu identidad de forma segura. Esto suele tardar unos segundos.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="d" className="verify-wrap" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.div className="success-ring" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
                <div className="inner"><Check style={{ width: 30, height: 30 }} /></div>
              </motion.div>
              <div>
                <h3>¡Identidad verificada!</h3>
                <p>Tu cuenta Quincena está lista. Preparando tu panel…</p>
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

      <span className="eyebrow">Paso 2 de 3</span>
      <h2 className="display" style={{ marginTop: 8 }}>Verifica tu<br />número</h2>
      <p className="lead" style={{ marginTop: 10 }}>
        Escribe el código de 6 dígitos que enviamos al{' '}
        <b style={{ color: '#f4f1fb' }}>{formatPhone(phone) || 'tu número'}</b>.
      </p>

      <div className="otp-row" style={{ marginTop: 28 }}>
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

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <span className="btn-link">Reenviar código en <b>0:28</b></span>
      </div>

      <div className="hint">
        <Spark style={{ width: 18, height: 18, flexShrink: 0 }} />
        <div>
          <b>Demo:</b> este campo es decorativo. No se envía ni se valida ningún código real.
          Toca <b onClick={autofill} style={{ cursor: 'pointer', textDecoration: 'underline' }}>“rellenar ejemplo”</b> para continuar.
        </div>
      </div>

      <div className="spacer" />
      <button className="btn ghost" style={{ marginBottom: 10 }} onClick={autofill}>
        Rellenar ejemplo (demo)
      </button>
      <button className="btn" disabled={!filled} onClick={verify}>
        Verificar <Arrow />
      </button>
      <button className="btn-link" style={{ marginTop: 8, width: '100%' }} onClick={onBack}>
        ← Cambiar número
      </button>
    </div>
  )
}
