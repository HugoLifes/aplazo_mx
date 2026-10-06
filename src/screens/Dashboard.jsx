// Pantalla de DASHBOARD.
// ¿Cambiar montos, tarjeta, compras, tiendas, movimientos? -> edita src/content.js ("dashboard", "comercios", "hojas").
// ¿Cambiar el diseño? -> edita src/styles.css (busca ".credit-card", ".quick", ".pay-card", ".purchase", ".merchant", ".tx", ".sheet").
// Estado real: pagar sube tu crédito y avanza la compra; escanear crea una compra nueva.
// Animaciones: GSAP (entrada, revelado al hacer scroll con ScrollTrigger, cambios de pestaña/filtro).
import { useCallback, useMemo, useRef, useState } from 'react'
import { Chart, Home, User, Plus, Wallet, Bell, Flame } from '../components/Icons.jsx'
import CreditCard from '../components/CreditCard.jsx'
import QuickAction from '../components/QuickAction.jsx'
import PaymentCard from '../components/PaymentCard.jsx'
import PurchaseCard from '../components/PurchaseCard.jsx'
import MerchantCard from '../components/MerchantCard.jsx'
import MovementItem from '../components/MovementItem.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Sheet from '../components/Sheet.jsx'
import PaySheet from '../sheets/PaySheet.jsx'
import PlanSheet from '../sheets/PlanSheet.jsx'
import MerchantSheet from '../sheets/MerchantSheet.jsx'
import ScanSheet from '../sheets/ScanSheet.jsx'
import LimitSheet from '../sheets/LimitSheet.jsx'
import NotificationsSheet from '../sheets/NotificationsSheet.jsx'
import ProfileSheet from '../sheets/ProfileSheet.jsx'
import { dashboard as d, comercios, hojas, usuario } from '../content.js'
import { fill, greeting, nowTime, relDay } from '../lib/format.js'
import { getMerchant } from '../lib/merchants.js'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap.js'

const tiendas = comercios.filter((c) => c.catalogo !== false)
const categorias = [d.tiendasFiltroTodas, ...new Set(tiendas.map((c) => c.categoria))]

// Movimientos de content.js -> filas listas para pintar
let uid = 0
const toRow = (m) => ({
  ...m,
  id: ++uid,
  sub: m.tipo === 'pago' || m.tipo === 'cashback'
    ? [m.detalle, relDay(m.haceDias)].filter(Boolean).join(' · ')
    : `${relDay(m.haceDias)} · ${m.hora}`,
})

export default function Dashboard({ phone, onLogout }) {
  const tabs = Object.keys(d.movimientos)
  const [tab, setTab] = useState(tabs[0])
  const [nav, setNav] = useState('inicio')
  const [cat, setCat] = useState(d.tiendasFiltroTodas)
  const [showAll, setShowAll] = useState(false)

  // ---- Estado de la cuenta
  const [credito, setCredito] = useState(d.tarjeta.disponible)
  const [racha, setRacha] = useState(d.rachaInicial)
  const [planes, setPlanes] = useState(() => d.planes.map((p, i) => ({ ...p, id: i + 1 })))
  const [movs, setMovs] = useState(() => Object.fromEntries(tabs.map((k) => [k, d.movimientos[k].map(toRow)])))
  const [unread, setUnread] = useState(true)
  const [sheet, setSheet] = useState(null)     // { type, ... }
  const close = useCallback(() => setSheet(null), [])
  // Cerrar sesión: primero baja la hoja y luego cambia de pantalla
  const logout = useCallback(() => { setSheet(null); setTimeout(onLogout, 380) }, [onLogout])
  // Mientras la hoja baja al cerrarse, se sigue pintando su último contenido
  const lastSheet = useRef(null)
  if (sheet) lastSheet.current = sheet
  const shown = sheet || lastSheet.current

  const pendientes = planes.filter((p) => p.pagados < p.total)
  const proximo = useMemo(() => [...pendientes].sort((a, b) => a.enDias - b.enDias)[0] || null, [pendientes])

  const pay = useCallback((planId) => {
    const plan = planes.find((p) => p.id === planId)
    if (!plan) return
    setPlanes((ps) => ps.map((p) => (p.id === planId ? { ...p, pagados: p.pagados + 1, enDias: p.enDias + 14 } : p)))
    setCredito((c) => c + plan.monto)
    setRacha((r) => r + 1)
    setMovs((m) => ({ ...m, Pagos: [{ id: ++uid, nuevo: true, comercio: plan.comercio, tipo: 'pago', titulo: 'Pago quincena', sub: `${plan.nombre} · Hoy ${nowTime()}`, monto: -plan.monto }, ...m.Pagos.map((x) => ({ ...x, nuevo: false }))] }))
  }, [planes])

  const buy = useCallback((comercioId, monto) => {
    const m = getMerchant(comercioId)
    setPlanes((ps) => [{ id: Date.now(), comercio: m.id, nombre: m.nombre, color: m.color, tinta: m.tinta, inicial: m.nombre.charAt(0), pagados: 0, total: 4, monto: monto / 4, enDias: 14 }, ...ps])
    setCredito((c) => c - monto)
    setMovs((s) => ({ ...s, Compras: [{ id: ++uid, nuevo: true, comercio: m.id, titulo: m.nombre, sub: `Hoy · ${nowTime()}`, monto: -monto }, ...s.Compras.map((x) => ({ ...x, nuevo: false }))] }))
  }, [])

  // ---- Navegación interna
  const bodyRef = useRef(null)
  const refs = { tarjeta: useRef(null), compras: useRef(null), tiendas: useRef(null), movimientos: useRef(null) }

  const scrollTo = (key) => {
    const body = bodyRef.current
    if (!body) return
    const el = key === 'top' ? null : refs[key]?.current
    const top = el ? body.scrollTop + el.getBoundingClientRect().top - body.getBoundingClientRect().top - 12 : 0
    gsap.to(body, { scrollTop: top, duration: 0.9, ease: 'power3.inOut' })
  }

  const doAction = (accion) => {
    if (accion === 'escanear') setSheet({ type: 'scan' })
    else if (accion === 'limite') setSheet({ type: 'limit' })
    else if (accion === 'pagos') { setTab('Pagos'); scrollTo('movimientos') }
    else if (accion === 'actividad') { setTab(tabs[0]); scrollTo('movimientos') }
    else scrollTo(accion)
  }

  const filtradas = cat === d.tiendasFiltroTodas ? tiendas : tiendas.filter((c) => c.categoria === cat)
  const visibles = showAll || cat !== d.tiendasFiltroTodas ? filtradas : filtradas.slice(0, d.tiendasIniciales)

  // ---- Animaciones
  // Entrada + revelado al hacer scroll (el contenedor con scroll es el del "teléfono")
  useGSAP(() => {
    const scroller = bodyRef.current
    gsap.timeline()
      .from('.dash-head .ava', { scale: 0.4, autoAlpha: 0, duration: 0.7, ease: 'back.out(2)' })
      .from('.dash-head .hello, .dash-head .name', { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, 0.08)
      .from('.dash-head .icon-btn', { scale: 0.5, autoAlpha: 0, duration: 0.5, ease: 'back.out(2.4)' }, 0.2)
      .from('.streak', { x: -16, autoAlpha: 0, duration: 0.6 }, 0.3)

    const items = gsap.utils.toArray('[data-reveal]', scroller)
    gsap.set(items, { autoAlpha: 0, y: 30 })
    ScrollTrigger.batch(items, {
      scroller,
      start: 'top 96%',
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.07, ease: 'power3.out', delay: 0.25, overwrite: true, clearProps: 'transform,translate,rotate,scale,opacity,visibility' }),
    })
    // Titulares de sección: la barrita de color se dibuja al entrar
    gsap.utils.toArray('.section-title', scroller).forEach((el) => {
      gsap.from(el, { autoAlpha: 0, y: 18, duration: 0.6, scrollTrigger: { trigger: el, scroller, start: 'top 95%', once: true } })
    })
  }, { scope: bodyRef })

  // Cambio de pestaña de movimientos y de filtro de tiendas
  const firstTab = useRef(true)
  useGSAP(() => {
    if (firstTab.current) { firstTab.current = false; return }
    gsap.from('.tx', { x: 24, autoAlpha: 0, duration: 0.45, stagger: 0.05, ease: 'power3.out' })
  }, { scope: bodyRef, dependencies: [tab] })

  const firstFilter = useRef(true)
  useGSAP(() => {
    if (firstFilter.current) { firstFilter.current = false; return }
    gsap.fromTo('.merchant', { y: 18, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power3.out', clearProps: 'transform,translate,rotate,scale' })
    ScrollTrigger.refresh()
  }, { scope: bodyRef, dependencies: [cat, showAll] })

  // Fila nueva (pago o compra) que entra con destello
  useGSAP(() => {
    if (!bodyRef.current?.querySelector('.tx.is-new')) return
    gsap.fromTo('.tx.is-new', { backgroundColor: 'rgba(104,215,232,0.28)' }, { backgroundColor: 'rgba(104,215,232,0)', duration: 1.6, delay: 0.2, ease: 'power2.out' })
  }, { scope: bodyRef, dependencies: [movs] })

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home, run: () => scrollTo('top') },
    { id: 'actividad', label: 'Actividad', icon: Chart, run: () => doAction('actividad') },
    { id: 'fab', icon: Plus, fab: true, run: () => setSheet({ type: 'scan' }) },
    { id: 'pagos', label: 'Pagos', icon: Wallet, run: () => doAction('pagos') },
    { id: 'perfil', label: 'Perfil', icon: User, run: () => setSheet({ type: 'profile' }) },
  ]

  const sheetPlan = shown?.planId ? planes.find((p) => p.id === shown.planId) : null
  const sheetTitle = {
    pay: hojas.pagar.titulo,
    plan: sheetPlan?.nombre,
    merchant: shown?.merchant?.nombre,
    scan: hojas.escanear.titulo,
    limit: hojas.limite.titulo,
    notif: hojas.notificaciones.titulo,
    profile: '',
  }[shown?.type]

  return (
    <>
      <div className="screen-body dash" ref={bodyRef}>
        {/* Encabezado */}
        <div className="dash-head">
          <div className="hi">
            <div className="ava">{usuario.nombre.charAt(0)}</div>
            <div>
              <span className="hello">{greeting(d.saludos)},</span>
              <div className="name">{usuario.nombre} 👋</div>
            </div>
          </div>
          <div className="tools">
            <button type="button" className="icon-btn" aria-label={hojas.notificaciones.titulo} onClick={() => setSheet({ type: 'notif' })}>
              <Bell />{unread && <span className="dot" />}
            </button>
          </div>
        </div>
        <span className="streak"><Flame style={{ width: 12, height: 12 }} /> {fill(d.racha, { n: racha })}</span>

        {/* Tarjeta de crédito */}
        <div ref={refs.tarjeta} className="dash-block">
          <CreditCard data={d.tarjeta} disponible={credito} titular={`${usuario.nombre} ${usuario.apellido}`} />
        </div>

        {/* Accesos rápidos */}
        <div className="quick-row" aria-label={d.accionesTitulo}>
          {d.acciones.map((q, i) => (
            <QuickAction key={i} action={q} pendientes={pendientes.length} onClick={() => doAction(q.accion)} />
          ))}
        </div>

        {/* Próximo pago */}
        <PaymentCard
          plan={proximo}
          labels={d.proximoPago}
          onPay={() => proximo && setSheet({ type: 'pay', planId: proximo.id })}
          onSeePayments={() => doAction('pagos')}
        />

        {/* Tus compras (planes activos) */}
        <div ref={refs.compras}>
          <SectionHeader title={d.planesTitulo} action={d.planesVerTodos} onAction={() => doAction('actividad')} />
          <div className="purchase-rail">
            {planes.map((p) => (
              <PurchaseCard key={p.id} plan={p} liquidado={d.planLiquidado} onClick={() => setSheet({ type: 'plan', planId: p.id })} />
            ))}
          </div>
        </div>

        {/* Insight */}
        <div className="insight" data-reveal>
          <div className="spark-ic"><Chart style={{ width: 20, height: 20 }} /></div>
          <p>{d.insight}</p>
        </div>

        {/* Tiendas asociadas */}
        <div ref={refs.tiendas}>
          <SectionHeader
            title={d.tiendasTitulo}
            sub={d.tiendasSub}
            action={cat === d.tiendasFiltroTodas && tiendas.length > d.tiendasIniciales ? (showAll ? d.tiendasVerMenos : d.tiendasVerTodas) : null}
            onAction={() => setShowAll((v) => !v)}
          />
          <div className="chips" role="tablist" data-reveal>
            {categorias.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="merchant-grid" data-reveal>
            {visibles.map((m) => <MerchantCard key={m.id} merchant={m} onClick={() => setSheet({ type: 'merchant', merchant: m })} />)}
          </div>
        </div>

        {/* Movimientos con pestañas */}
        <div ref={refs.movimientos}>
          <SectionHeader title={d.movimientosTitulo} />
          <div className="seg" data-reveal style={{ '--i': tabs.indexOf(tab), '--n': tabs.length }}>
            <span className="seg-pill" aria-hidden="true" />
            {tabs.map((k) => (
              <button key={k} type="button" className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
                <span>{k}</span>
              </button>
            ))}
          </div>
          <div className="tx-list" data-reveal>
            {movs[tab].length
              ? movs[tab].map((m) => <MovementItem key={m.id} item={m} />)
              : <p className="tx-empty">{d.movimientosVacio}</p>}
          </div>
        </div>
      </div>

      {/* Barra inferior de navegación */}
      <nav className="tabbar">
        {navItems.map(({ id, label, icon: Ico, fab, run }) => (
          <button
            key={id}
            type="button"
            className={fab ? 'fab' : nav === id ? 'active' : ''}
            aria-label={label || hojas.escanear.titulo}
            onClick={() => { if (!fab && id !== 'perfil') setNav(id); run() }}
          >
            <Ico />{label && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Hojas */}
      <Sheet open={!!sheet} onClose={close} title={sheetTitle} dark={shown?.type === 'scan'}>
        {shown?.type === 'pay' && sheetPlan && <PaySheet plan={sheetPlan} onConfirm={pay} onClose={close} />}
        {shown?.type === 'plan' && sheetPlan && (
          <PlanSheet plan={sheetPlan} onPay={() => setSheet({ type: 'pay', planId: sheetPlan.id })} />
        )}
        {shown?.type === 'merchant' && <MerchantSheet merchant={shown.merchant} credito={credito} />}
        {shown?.type === 'scan' && <ScanSheet credito={credito} onBuy={buy} onClose={close} />}
        {shown?.type === 'limit' && <LimitSheet racha={racha} />}
        {shown?.type === 'notif' && <NotificationsSheet unread={unread} onRead={() => setUnread(false)} />}
        {shown?.type === 'profile' && <ProfileSheet phone={phone} onLogout={logout} />}
      </Sheet>
    </>
  )
}
