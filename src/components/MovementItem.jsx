// Fila de "Movimientos". Datos: dashboard.movimientos
import MerchantLogo from './MerchantLogo.jsx'
import { Check, Gift } from './Icons.jsx'
import { money } from '../lib/format.js'

export default function MovementItem({ item: m }) {
  return (
    <div className={`tx ${m.nuevo ? 'is-new' : ''}`}>
      <span className="tx-ic">
        <MerchantLogo id={m.comercio} size="xs" />
        {m.tipo === 'pago' && <i className="tx-badge ok"><Check /></i>}
        {m.tipo === 'cashback' && <i className="tx-badge gift"><Gift /></i>}
      </span>
      <div className="tx-meta"><b>{m.titulo}</b><span>{m.sub}</span></div>
      <div className={`tx-amt ${m.monto > 0 ? 'in' : ''}`}>{money(m.monto, { signo: true })}</div>
    </div>
  )
}
