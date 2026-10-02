// Pantalla de NÚMERO DE TELÉFONO.
// ¿Cambiar textos, LADA, placeholder? -> edita src/content.js (sección "phone").
// ¿Cambiar el diseño del campo? -> edita src/styles.css (busca ".phone-input").
import { Arrow, Shield } from '../components/Icons.jsx'
import { phone as t } from '../content.js'

// Da formato al número mientras se escribe: 55 1234 5678
function format(v) {
  const d = v.replace(/\D/g, '').slice(0, 10)
  const p = []
  if (d.length > 0) p.push(d.slice(0, 2))
  if (d.length > 2) p.push(d.slice(2, 6))
  if (d.length > 6) p.push(d.slice(6, 10))
  return p.join(' ')
}

export default function PhoneStep({ phone, setPhone, onBack, onNext }) {
  const digits = phone.replace(/\D/g, '')
  const valid = digits.length === 10 // el botón se activa con 10 dígitos

  return (
    <div className="screen-body">
      <div className="progress"><i className="on" /><i className="on" /><i /><i /></div>

      <span className="eyebrow">{t.paso}</span>
      <h2 className="display" style={{ marginTop: 8, whiteSpace: 'pre-line' }}>{t.titulo}</h2>
      <p className="lead" style={{ marginTop: 10 }}>{t.descripcion}</p>

      <div style={{ marginTop: 26 }}>
        <div className="field">
          <label>{t.etiquetaCampo}</label>
          <div className="phone-input">
            <span className="cc"><span className="flag">{t.bandera}</span> {t.lada}</span>
            <input
              inputMode="numeric"
              placeholder={t.placeholder}
              value={format(phone)}
              onChange={(e) => setPhone(e.target.value)}
              aria-label={t.etiquetaCampo}
            />
          </div>
        </div>
      </div>

      <div className="feat-row" style={{ marginTop: 6 }}>
        <div className="fi" style={{ color: '#c6f560' }}><Shield /></div>
        <div>
          <b>{t.seguridadTitulo}</b>
          <span>{t.seguridadSub}</span>
        </div>
      </div>

      <div className="spacer" />
      <button className="btn" disabled={!valid} onClick={onNext}>
        {t.botonPrincipal} <Arrow />
      </button>
      <button className="btn-link" style={{ marginTop: 8, width: '100%' }} onClick={onBack}>
        {t.botonRegresar}
      </button>
    </div>
  )
}
