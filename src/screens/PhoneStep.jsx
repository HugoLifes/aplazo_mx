// Pantalla de NÚMERO DE TELÉFONO.
// ¿Cambiar textos, LADA, placeholder? -> edita src/content.js (sección "phone").
// ¿Cambiar el diseño del campo? -> edita src/styles.css (busca ".phone-input").
import { useEffect, useRef } from 'react'
import { Arrow, Check, Shield } from '../components/Icons.jsx'
import { phone as t } from '../content.js'
import { fill, formatPhone } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'

// Solo dígitos y como máximo `t.digitos` (también al pegar "+52 55 1234 5678")
function clean(value) {
  let d = value.replace(/\D/g, '')
  if (d.length > t.digitos && d.startsWith('52')) d = d.slice(2)
  return d.slice(0, t.digitos)
}

export default function PhoneStep({ phone, setPhone, onBack, onNext }) {
  const root = useRef(null)
  const input = useRef(null)
  const digits = phone
  const valid = digits.length === t.digitos
  const faltan = t.digitos - digits.length

  useGSAP(() => {
    gsap.timeline()
      .from('.progress i', { scaleX: 0, transformOrigin: 'left center', duration: 0.6, stagger: 0.06, ease: 'power2.out' })
      .from('.screen-head > *', { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, 0.1)
      .from('.form-block, .feat-row', { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, 0.3)
      .from('.cta-bar > *', { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.08, clearProps: 'transform,translate,rotate,scale,opacity,visibility' }, 0.4)
  }, { scope: root })

  // Palomita que aparece al completar el número
  useGSAP(() => {
    if (valid) gsap.fromTo('.pi-ok', { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2.4)' })
  }, { scope: root, dependencies: [valid] })

  useEffect(() => {
    const id = setTimeout(() => input.current?.focus({ preventScroll: true }), 450)
    return () => clearTimeout(id)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (valid) onNext()
    else gsap.fromTo('.phone-input', { x: 0 }, { x: 0, duration: 0.4, ease: 'none', keyframes: { x: [0, -8, 8, -5, 5, 0] } })
  }

  return (
    <form className="screen-body" ref={root} onSubmit={submit} noValidate>
      <div className="progress"><i className="on" /><i className="on" /><i /><i /></div>

      <header className="screen-head">
        <span className="eyebrow">{t.paso}</span>
        <h2 className="display">{t.titulo}</h2>
        <p className="lead">{t.descripcion}</p>
      </header>

      <div className="form-block">
        <div className="field">
          <label htmlFor="tel">{t.etiquetaCampo}</label>
          <div className={`phone-input ${valid ? 'ok' : ''}`}>
            <span className="cc"><span className="flag">{t.bandera}</span> {t.lada}</span>
            <input
              id="tel"
              ref={input}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={t.placeholder}
              value={formatPhone(digits)}
              maxLength={t.digitos + 2}
              onChange={(e) => setPhone(clean(e.target.value))}
            />
            <span className="pi-ok" aria-hidden={!valid} style={{ visibility: valid ? 'visible' : 'hidden' }}><Check /></span>
          </div>
          <span className={`field-hint ${valid ? 'ok' : ''}`} aria-live="polite">
            {digits.length === 0 ? ' ' : valid ? t.ayudaListo : fill(t.ayudaFaltan, { n: faltan })}
          </span>
        </div>
      </div>

      <div className="feat-row">
        <div className="fi" style={{ color: '#76c9a8' }}><Shield /></div>
        <div>
          <b>{t.seguridadTitulo}</b>
          <span>{t.seguridadSub}</span>
        </div>
      </div>

      <div className="spacer" />
      <div className="cta-bar">
        <p className="legal">{t.terminos}</p>
        <button type="submit" className="btn" disabled={!valid}>
          {t.botonPrincipal} <Arrow />
        </button>
        <button type="button" className="btn-link" onClick={onBack}>
          {t.botonRegresar}
        </button>
      </div>
    </form>
  )
}
