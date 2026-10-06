// Pantalla de BIENVENIDA.
// ¿Cambiar textos, beneficios o la prueba social? -> edita src/content.js (sección "welcome").
// ¿Cambiar el diseño (colores, tamaños)? -> edita src/styles.css (busca ".hero-", ".feat-" y ".marquee").
import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import { Arrow, Icon } from '../components/Icons.jsx'
import MerchantLogo from '../components/MerchantLogo.jsx'
import { welcome, comercios } from '../content.js'

const tiendas = comercios.filter((c) => c.catalogo !== false)

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
            <circle cx="12" cy="12" r="3.6" fill="#68d7e8" />
          </svg>
        </motion.div>
        <motion.div className="hero-chip c1" animate={{ y: [0, -7, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <span className="d" style={{ background: '#68d7e8' }} /> {welcome.chipArriba}
        </motion.div>
        <motion.div className="hero-chip c2" animate={{ y: [0, 7, 0] }} transition={{ duration: 3.4, repeat: Infinity }}>
          <span className="d" style={{ background: '#151537' }} /> {welcome.chipAbajo}
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
            <div className="fi" style={{ color: '#151537' }}><Icon name={f.icon} /></div>
            <div><b>{f.titulo}</b><span>{f.sub}</span></div>
          </motion.div>
        ))}
      </div>

      {/* Tira animada de logos de tiendas asociadas */}
      <div className="marquee" aria-label={welcome.tiendasTitulo}>
        <span className="marquee-title">{welcome.tiendasTitulo}</span>
        <div className="marquee-mask">
          <motion.div
            className="marquee-track"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[...tiendas, ...tiendas].map((m, i) => (
              <span key={i} className="marquee-item" aria-hidden={i >= tiendas.length}>
                <MerchantLogo id={m.id} size="chip" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="trust">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="avatars">
            <i style={{ background: 'linear-gradient(135deg,#151537,#3a3a7a)' }} />
            <i style={{ background: 'linear-gradient(135deg,#b8a9ed,#d0c5f5)' }} />
            <i style={{ background: 'linear-gradient(135deg,#68d7e8,#9fe8f2)' }} />
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
