import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import { Arrow, Bolt, Shield, Gift } from '../components/Icons.jsx'

const feats = [
  { ic: <Bolt />, t: 'Aprobación en segundos', s: 'Sin papeleo ni filas' },
  { ic: <Shield />, t: 'Sin tarjeta, sin intereses ocultos', s: 'Todo claro desde el inicio' },
  { ic: <Gift />, t: 'Divide en 4 quincenas', s: 'Compra hoy, paga a tu ritmo' },
]

export default function Welcome({ onNext }) {
  return (
    <div className="screen-body">
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
        <Logo size="lg" />
      </div>

      <div className="hero-orbit">
        <div className="ring r2" />
        <div className="ring r1" />
        <motion.div
          className="hero-coin"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
            <path d="M12 2a10 10 0 100 20 10 10 0 00-6-18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3.6" fill="#c6f560" />
          </svg>
        </motion.div>
        <motion.div className="hero-chip c1" animate={{ y: [0, -7, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <span className="d" style={{ background: '#c6f560' }} /> +$6,000 disponible
        </motion.div>
        <motion.div className="hero-chip c2" animate={{ y: [0, 7, 0] }} transition={{ duration: 3.4, repeat: Infinity }}>
          <span className="d" style={{ background: '#7c6cff' }} /> 0% interés
        </motion.div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 4 }}>
        <h2 className="display">Compra hoy,<br />paga en quincenas</h2>
        <p className="lead" style={{ marginTop: 10 }}>
          La forma más simple de dividir tus compras en 4 pagos, sin tarjeta de crédito.
        </p>
      </div>

      <div style={{ margin: '18px 0 4px' }}>
        {feats.map((f, i) => (
          <motion.div
            key={i}
            className="feat-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            <div className="fi" style={{ color: '#a78bfa' }}>{f.ic}</div>
            <div><b>{f.t}</b><span>{f.s}</span></div>
          </motion.div>
        ))}
      </div>

      <div className="trust">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="avatars">
            <i style={{ background: 'linear-gradient(135deg,#7c6cff,#a78bfa)' }} />
            <i style={{ background: 'linear-gradient(135deg,#ff8a6b,#ffb199)' }} />
            <i style={{ background: 'linear-gradient(135deg,#c6f560,#8fd14f)' }} />
          </div>
          <span><b style={{ color: 'var(--txt)' }}>+120 mil</b> usuarios</span>
        </div>
        <div className="sep" />
        <div><span className="stars">★★★★★</span> <b>4.9</b> <span>en tiendas</span></div>
      </div>

      <div className="spacer" />
      <button className="btn" onClick={onNext}>Comenzar <Arrow /></button>
      <button className="btn-link" style={{ marginTop: 8, width: '100%' }}>
        ¿Ya tienes cuenta? <b>Inicia sesión</b>
      </button>
    </div>
  )
}
