// Pantalla de BIENVENIDA.
// ¿Cambiar textos, beneficios o la prueba social? -> edita src/content.js (sección "welcome").
// ¿Cambiar el diseño (colores, tamaños)? -> edita src/styles.css (busca ".hero-" y ".feat-").
import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import { Arrow, Icon } from '../components/Icons.jsx'
import { welcome } from '../content.js'

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
          <span className="d" style={{ background: '#c6f560' }} /> {welcome.chipArriba}
        </motion.div>
        <motion.div className="hero-chip c2" animate={{ y: [0, 7, 0] }} transition={{ duration: 3.4, repeat: Infinity }}>
          <span className="d" style={{ background: '#7c6cff' }} /> {welcome.chipAbajo}
        </motion.div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 4 }}>
        {/* El título puede tener un salto de línea con \n en content.js */}
        <h2 className="display" style={{ whiteSpace: 'pre-line' }}>{welcome.titulo}</h2>
        <p className="lead" style={{ marginTop: 10 }}>{welcome.descripcion}</p>
      </div>

      <div style={{ margin: '18px 0 4px' }}>
        {welcome.beneficios.map((f, i) => (
          <motion.div
            key={i}
            className="feat-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            <div className="fi" style={{ color: '#a78bfa' }}><Icon name={f.icon} /></div>
            <div><b>{f.titulo}</b><span>{f.sub}</span></div>
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
          <span><b style={{ color: 'var(--txt)' }}>{welcome.usuarios}</b> {welcome.usuariosSub}</span>
        </div>
        <div className="sep" />
        <div><span className="stars">★★★★★</span> <b>{welcome.rating}</b> <span>{welcome.ratingSub}</span></div>
      </div>

      <div className="spacer" />
      <button className="btn" onClick={onNext}>{welcome.botonPrincipal} <Arrow /></button>
      <button className="btn-link" style={{ marginTop: 8, width: '100%' }}>
        {welcome.botonSecundario}<b>{welcome.botonSecundarioResalte}</b>
      </button>
    </div>
  )
}
