import { Arrow, Shield, Phone } from '../components/Icons.jsx'

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
  const valid = digits.length === 10

  return (
    <div className="screen-body">
      <div className="progress"><i className="on" /><i className="on" /><i /><i /></div>

      <span className="eyebrow">Paso 1 de 3</span>
      <h2 className="display" style={{ marginTop: 8 }}>¿Cuál es tu<br />número?</h2>
      <p className="lead" style={{ marginTop: 10 }}>
        Lo usamos para crear tu cuenta y mantenerla segura. Te enviaremos un código para confirmarlo.
      </p>

      <div style={{ marginTop: 26 }}>
        <div className="field">
          <label>Número de celular</label>
          <div className="phone-input">
            <span className="cc"><span className="flag">🇲🇽</span> +52</span>
            <input
              inputMode="numeric"
              placeholder="55 1234 5678"
              value={format(phone)}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Número de celular"
            />
          </div>
        </div>
      </div>

      <div className="feat-row" style={{ marginTop: 6 }}>
        <div className="fi" style={{ color: '#c6f560' }}><Shield /></div>
        <div>
          <b>Tus datos están protegidos</b>
          <span>Cifrado de extremo a extremo · nunca compartimos tu número</span>
        </div>
      </div>

      <div className="spacer" />
      <button className="btn" disabled={!valid} onClick={onNext}>
        Enviar código <Arrow />
      </button>
      <button className="btn-link" style={{ marginTop: 8, width: '100%' }} onClick={onBack}>
        ← Regresar
      </button>
    </div>
  )
}
