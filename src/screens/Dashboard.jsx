// Pantalla de DASHBOARD.
// ¿Cambiar montos, tarjeta, compras, tiendas, movimientos? -> edita src/content.js ("dashboard" y "comercios").
// ¿Cambiar el diseño? -> edita src/styles.css (busca ".credit-card", ".quick", ".pay-card", ".purchase", ".merchant", ".tx").
// Las piezas visuales viven en src/components/ (CreditCard, QuickAction, PaymentCard, …).
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Chart, Home, User, Plus, Wallet, Bell, Flame } from '../components/Icons.jsx'
import CreditCard from '../components/CreditCard.jsx'
import QuickAction from '../components/QuickAction.jsx'
import PaymentCard from '../components/PaymentCard.jsx'
import PurchaseCard from '../components/PurchaseCard.jsx'
import MerchantCard from '../components/MerchantCard.jsx'
import MovementItem from '../components/MovementItem.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { dashboard as d, comercios } from '../content.js'

const tiendas = comercios.filter((c) => c.catalogo !== false)
const categorias = [d.tiendasFiltroTodas, ...new Set(tiendas.map((c) => c.categoria))]

export default function Dashboard({ onRestart }) {
  const tabs = Object.keys(d.movimientos)
  const [tab, setTab] = useState(tabs[0])
  const [nav, setNav] = useState('inicio')
  const [cat, setCat] = useState(d.tiendasFiltroTodas)
  const [showAll, setShowAll] = useState(false)

  // Secciones a las que se puede saltar (acciones rápidas, "Ver pagos", barra inferior)
  const bodyRef = useRef(null)
  const refs = { tarjeta: useRef(null), compras: useRef(null), tiendas: useRef(null), movimientos: useRef(null) }

  const scrollTo = (key) => {
    const body = bodyRef.current
    if (!body) return
    const el = key === 'top' ? null : refs[key]?.current
    const top = el ? body.scrollTop + el.getBoundingClientRect().top - body.getBoundingClientRect().top - 12 : 0
    body.scrollTo({ top, behavior: 'smooth' })
  }

  // 'pagos' y 'compras' de los movimientos abren su pestaña antes de desplazarse
  const goTo = (destino) => {
    if (destino === 'pagos' && d.movimientos.Pagos) { setTab('Pagos'); scrollTo('movimientos') }
    else if (destino === 'actividad') { setTab(tabs[0]); scrollTo('movimientos') }
    else scrollTo(destino)
  }

  const filtradas = cat === d.tiendasFiltroTodas ? tiendas : tiendas.filter((c) => c.categoria === cat)
  const visibles = showAll || cat !== d.tiendasFiltroTodas ? filtradas : filtradas.slice(0, d.tiendasIniciales)

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home, to: 'top' },
    { id: 'actividad', label: 'Actividad', icon: Chart, to: 'actividad' },
    { id: 'fab', icon: Plus, to: 'tiendas', fab: true },
    { id: 'pagos', label: 'Pagos', icon: Wallet, to: 'pagos' },
    { id: 'perfil', label: 'Perfil', icon: User, to: 'tarjeta' },
  ]

  return (
    <>
      <div className="screen-body dash" ref={bodyRef}>
        {/* Encabezado */}
        <div className="dash-head">
          <div className="hi">
            <div className="ava">{d.inicialAvatar}</div>
            <div>
              <span className="hello">{d.saludo}</span>
              <div className="name">{d.nombre}</div>
            </div>
          </div>
          <div className="tools">
            <motion.button type="button" className="icon-btn" aria-label="Notificaciones" whileTap={{ scale: 0.92 }}>
              <Bell /><span className="dot" />
            </motion.button>
          </div>
        </div>
        <span className="streak"><Flame style={{ width: 12, height: 12 }} /> {d.racha}</span>

        {/* Tarjeta de crédito */}
        <div ref={refs.tarjeta} className="dash-block">
          <CreditCard data={d.tarjeta} />
        </div>

        {/* Accesos rápidos */}
        <div className="quick-row" aria-label={d.accionesTitulo}>
          {d.acciones.map((q, i) => (
            <QuickAction key={i} action={q} delay={0.12 + i * 0.05} onClick={() => goTo(q.destino)} />
          ))}
        </div>

        {/* Próximo pago */}
        <PaymentCard data={d.proximoPago} onSeePayments={() => goTo('pagos')} />

        {/* Tus compras (planes activos) */}
        <div ref={refs.compras}>
          <SectionHeader title={d.planesTitulo} action={d.planesVerTodos} onAction={() => goTo('actividad')} />
          <div className="purchase-rail">
            {d.planes.map((p, i) => <PurchaseCard key={i} plan={p} delay={0.12 + i * 0.07} />)}
          </div>
        </div>

        {/* Insight */}
        <motion.div className="insight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="spark-ic"><Chart style={{ width: 20, height: 20 }} /></div>
          <p>{d.insight}</p>
        </motion.div>

        {/* Tiendas asociadas */}
        <div ref={refs.tiendas}>
          <SectionHeader
            title={d.tiendasTitulo}
            sub={d.tiendasSub}
            action={cat === d.tiendasFiltroTodas && tiendas.length > d.tiendasIniciales ? (showAll ? d.tiendasVerMenos : d.tiendasVerTodas) : null}
            onAction={() => setShowAll((v) => !v)}
          />
          <div className="chips" role="tablist">
            {categorias.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="merchant-grid">
            {visibles.map((m, i) => <MerchantCard key={m.id} merchant={m} delay={Math.min(i, 6) * 0.04} />)}
          </div>
        </div>

        {/* Movimientos con pestañas */}
        <div ref={refs.movimientos}>
          <SectionHeader title={d.movimientosTitulo} />
          <div className="seg">
            {tabs.map((k) => (
              <button key={k} type="button" className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
                {tab === k && <motion.span layoutId="seg-pill" className="seg-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <span>{k}</span>
              </button>
            ))}
          </div>
          <div className="tx-list">
            {d.movimientos[tab].map((m, i) => <MovementItem key={tab + i} item={m} delay={i * 0.05} />)}
          </div>
        </div>

        <button className="btn-link" style={{ width: '100%', marginTop: 16 }} onClick={onRestart}>
          {d.botonReiniciar}
        </button>
      </div>

      {/* Barra inferior de navegación */}
      <nav className="tabbar">
        {navItems.map(({ id, label, icon: Ico, to, fab }) => (
          <motion.button
            key={id}
            type="button"
            className={fab ? 'fab' : nav === id ? 'active' : ''}
            aria-label={label || 'Comprar'}
            whileTap={{ scale: 0.9 }}
            onClick={() => { if (!fab) setNav(id); goTo(to) }}
          >
            <Ico />{label && <span>{label}</span>}
          </motion.button>
        ))}
      </nav>
    </>
  )
}
