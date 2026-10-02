import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cart, Scan, Wallet, Chart, Home, User, Plus, Spark, Bell, Flame, Calendar } from '../components/Icons.jsx'

const plans = [
  { name: 'Liverpool', color: '#e0457b', init: 'L', paid: 3, total: 4, next: '$625', date: '15 oct' },
  { name: 'Mercado Libre', color: '#ffe600', ink: '#3a3100', init: 'M', paid: 1, total: 4, next: '$340', date: '22 oct' },
  { name: 'Nike Store', color: '#111', init: 'N', paid: 2, total: 4, next: '$780', date: '28 oct' },
]

const quicks = [
  { ic: <Scan />, cls: '', t: 'Escanear QR', s: 'Paga en tienda' },
  { ic: <Cart />, cls: 'lime', t: 'Comprar en línea', s: 'Genera tu link' },
  { ic: <Wallet />, cls: 'coral', t: 'Mis pagos', s: '3 por vencer' },
  { ic: <Spark />, cls: '', t: 'Sube tu límite', s: 'Hasta $12,000' },
]

const txs = {
  Compras: [
    { ic: '🛍️', t: 'Liverpool', s: 'Hoy · 14:32', a: '-$2,500', in: false },
    { ic: '👟', t: 'Nike Store', s: 'Ayer · 19:05', a: '-$3,120', in: false },
    { ic: '📦', t: 'Mercado Libre', s: '28 sep · 11:20', a: '-$1,360', in: false },
  ],
  Pagos: [
    { ic: '✅', t: 'Pago quincena', s: 'Hoy · 09:00', a: '-$625', in: false },
    { ic: '🎁', t: 'Cashback Quincena', s: '30 sep', a: '+$48', in: true },
    { ic: '✅', t: 'Pago quincena', s: '15 sep', a: '-$780', in: false },
  ],
}

export default function Dashboard({ onRestart }) {
  const [tab, setTab] = useState('Compras')

  return (
    <>
      <div className="screen-body">
        {/* Header */}
        <div className="dash-head">
          <div className="hi">
            <div className="ava">Q</div>
            <div>
              <span style={{ fontSize: 13, color: 'var(--txt-faint)' }}>Buenas tardes,</span>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, lineHeight: 1.1 }}>Hola 👋</div>
              <span className="streak"><Flame style={{ width: 12, height: 12 }} /> Racha de 6 pagos a tiempo</span>
            </div>
          </div>
          <div className="tools">
            <div className="icon-btn"><Bell /><span className="dot" /></div>
          </div>
        </div>

        {/* Credit card */}
        <motion.div className="credit-card" style={{ marginTop: 16 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <div className="cc-brand">
            quincena
            <span className="cc-waves"><b /><b /><b /></span>
          </div>
          <div className="cc-top">
            <div>
              <div className="cc-label">Crédito disponible</div>
              <div className="cc-amount">$6,255</div>
              <div className="cc-sub">de $8,000 · límite total</div>
            </div>
          </div>
          <div className="cc-meter">
            <div className="bar"><motion.i initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ delay: 0.3, duration: 0.8 }} /></div>
            <div className="row"><span>Usado $1,745</span><span>78% libre</span></div>
          </div>
          <div className="cc-number">
            <span>5412</span><span>••••</span><span>••••</span><span>8842</span>
          </div>
          <div className="cc-foot">
            <div><div className="k">Titular</div><div className="v">Tu Nombre</div></div>
            <div><div className="k">Miembro desde</div><div className="v">10/26</div></div>
          </div>
        </motion.div>

        {/* Insight */}
        <motion.div className="insight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="spark-ic"><Chart style={{ width: 20, height: 20 }} /></div>
          <p>Este mes gastas <b>18% menos</b> que el anterior. ¡Vas por buen camino! 🎯</p>
        </motion.div>

        {/* Next payment */}
        <motion.div className="next-pay" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          <div className="np-ic"><Calendar /></div>
          <div className="np-meta">
            <b>Próximo pago · $625</b>
            <span>Liverpool · vence el 15 de octubre</span>
          </div>
          <button className="np-cta">Pagar</button>
        </motion.div>

        {/* Quick actions */}
        <div className="section-title"><h3>Acciones rápidas</h3></div>
        <div className="quick-grid">
          {quicks.map((q, i) => (
            <motion.div key={i} className="quick" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
              <div className={`ic ${q.cls}`}>{q.ic}</div>
              <div><b>{q.t}</b><br /><span>{q.s}</span></div>
            </motion.div>
          ))}
        </div>

        {/* Active plans */}
        <div className="section-title">
          <h3>Planes activos</h3>
          <a>Ver todos</a>
        </div>
        {plans.map((p, i) => (
          <motion.div key={i} className="plan" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.07 }}>
            <div className="logo-dot" style={{ background: p.color, color: p.ink || '#fff' }}>{p.init}</div>
            <div className="meta">
              <b>{p.name}</b>
              <span>{p.paid} de {p.total} pagos · próximo {p.date}</span>
              <div className="pbar"><i style={{ width: `${(p.paid / p.total) * 100}%` }} /></div>
            </div>
            <div className="amt"><b>{p.next}</b><span>próximo</span></div>
          </motion.div>
        ))}

        {/* Movements with segmented control */}
        <div className="section-title" style={{ marginBottom: 0 }}><h3>Movimientos</h3></div>
        <div className="seg">
          {Object.keys(txs).map((k) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{k}</button>
          ))}
        </div>
        <div>
          {txs[tab].map((t, i) => (
            <motion.div key={t.t + i} className="tx" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <div className="tx-ic">{t.ic}</div>
              <div className="tx-meta"><b>{t.t}</b><span>{t.s}</span></div>
              <div className={`tx-amt ${t.in ? 'in' : ''}`}>{t.a}</div>
            </motion.div>
          ))}
        </div>

        <button className="btn-link" style={{ width: '100%', marginTop: 16 }} onClick={onRestart}>
          ↺ Reiniciar demo
        </button>
      </div>

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
