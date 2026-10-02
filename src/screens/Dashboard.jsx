// Pantalla de DASHBOARD.
// ¿Cambiar montos, tarjeta, planes, movimientos? -> edita src/content.js (sección "dashboard").
// ¿Cambiar el diseño? -> edita src/styles.css (busca ".credit-card", ".quick", ".plan", ".tx").
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon, Chart, Home, User, Plus, Wallet, Bell, Flame, Calendar } from '../components/Icons.jsx'
import { dashboard as d } from '../content.js'

export default function Dashboard({ onRestart }) {
  const [tab, setTab] = useState('Compras')
  const tabs = Object.keys(d.movimientos)

  return (
    <>
      <div className="screen-body">
        {/* Encabezado */}
        <div className="dash-head">
          <div className="hi">
            <div className="ava">{d.inicialAvatar}</div>
            <div>
              <span style={{ fontSize: 13, color: 'var(--txt-faint)' }}>{d.saludo}</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, lineHeight: 1.1 }}>{d.nombre}</div>
              <span className="streak"><Flame style={{ width: 12, height: 12 }} /> {d.racha}</span>
            </div>
          </div>
          <div className="tools">
            <div className="icon-btn"><Bell /><span className="dot" /></div>
          </div>
        </div>

        {/* Tarjeta de crédito */}
        <motion.div className="credit-card" style={{ marginTop: 16 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <div className="cc-brand">
            {d.tarjeta.marca}
            <span className="cc-waves"><b /><b /><b /></span>
          </div>
          <div className="cc-top">
            <div>
              <div className="cc-label">{d.tarjeta.etiqueta}</div>
              <div className="cc-amount">{d.tarjeta.monto}</div>
              <div className="cc-sub">{d.tarjeta.sub}</div>
            </div>
          </div>
          <div className="cc-meter">
            <div className="bar"><motion.i initial={{ width: 0 }} animate={{ width: `${d.tarjeta.porcentajeUsado}%` }} transition={{ delay: 0.3, duration: 0.8 }} /></div>
            <div className="row"><span>{d.tarjeta.usado}</span><span>{d.tarjeta.libre}</span></div>
          </div>
          <div className="cc-number">
            {d.tarjeta.numero.map((n, i) => <span key={i}>{n}</span>)}
          </div>
          <div className="cc-foot">
            <div><div className="k">{d.tarjeta.titularEtiqueta}</div><div className="v">{d.tarjeta.titular}</div></div>
            <div><div className="k">{d.tarjeta.desdeEtiqueta}</div><div className="v">{d.tarjeta.desde}</div></div>
          </div>
        </motion.div>

        {/* Insight */}
        <motion.div className="insight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="spark-ic"><Chart style={{ width: 20, height: 20 }} /></div>
          <p>{d.insight}</p>
        </motion.div>

        {/* Próximo pago */}
        <motion.div className="next-pay" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <div className="np-ic"><Calendar /></div>
          <div className="np-meta">
            <b>{d.proximoPago.titulo}</b>
            <span>{d.proximoPago.sub}</span>
          </div>
          <button className="np-cta">{d.proximoPago.boton}</button>
        </motion.div>

        {/* Accesos rápidos */}
        <div className="section-title"><h3>{d.accionesTitulo}</h3></div>
        <div className="quick-grid">
          {d.acciones.map((q, i) => (
            <motion.div key={i} className="quick" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
              <div className={`ic ${q.color}`}><Icon name={q.icon} /></div>
              <div><b>{q.titulo}</b><br /><span>{q.sub}</span></div>
            </motion.div>
          ))}
        </div>

        {/* Planes activos */}
        <div className="section-title">
          <h3>{d.planesTitulo}</h3>
          <a>{d.planesVerTodos}</a>
        </div>
        {d.planes.map((p, i) => (
          <motion.div key={i} className="plan" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.07 }}>
            <div className="logo-dot" style={{ background: p.color, color: p.tinta || '#fff' }}>{p.inicial}</div>
            <div className="meta">
              <b>{p.nombre}</b>
              <span>{p.pagados} de {p.total} pagos · próximo {p.fecha}</span>
              <div className="pbar"><i style={{ width: `${(p.pagados / p.total) * 100}%` }} /></div>
            </div>
            <div className="amt"><b>{p.proximo}</b><span>próximo</span></div>
          </motion.div>
        ))}

        {/* Movimientos con pestañas */}
        <div className="section-title" style={{ marginBottom: 0 }}><h3>{d.movimientosTitulo}</h3></div>
        <div className="seg">
          {tabs.map((k) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{k}</button>
          ))}
        </div>
        <div>
          {d.movimientos[tab].map((m, i) => (
            <motion.div key={m.titulo + i} className="tx" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <div className="tx-ic">{m.emoji}</div>
              <div className="tx-meta"><b>{m.titulo}</b><span>{m.sub}</span></div>
              <div className={`tx-amt ${m.entrada ? 'in' : ''}`}>{m.monto}</div>
            </motion.div>
          ))}
        </div>

        <button className="btn-link" style={{ width: '100%', marginTop: 16 }} onClick={onRestart}>
          {d.botonReiniciar}
        </button>
      </div>

      {/* Barra inferior de navegación */}
      <nav className="tabbar">
        <a className="active"><Home /><span>Inicio</span></a>
        <a><Chart /><span>Actividad</span></a>
        <a className="fab"><Plus /></a>
        <a><Wallet /><span>Pagos</span></a>
        <a><User /><span>Perfil</span></a>
      </nav>
    </>
  )
}
