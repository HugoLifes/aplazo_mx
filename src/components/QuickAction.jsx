// Acceso rápido (Escanear, Comprar, Pagos, Límite). Datos: dashboard.acciones
import { Icon } from './Icons.jsx'
import { fill } from '../lib/format.js'

export default function QuickAction({ action: q, pendientes = 0, onClick }) {
  const sub = fill(q.sub, { n: pendientes })
  return (
    <button type="button" className="quick" data-reveal onClick={onClick} title={`${q.titulo} · ${sub}`}>
      <span className={`ic ${q.color || ''}`}>
        <Icon name={q.icon} />
        {q.badge && pendientes > 0 ? <em key={pendientes}>{pendientes}</em> : null}
      </span>
      <b>{q.corto || q.titulo}</b>
      <span className="sub">{sub}</span>
    </button>
  )
}
