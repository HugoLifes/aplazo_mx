// Tarjeta de una compra a plazos ("Tus compras"). Datos: dashboard.planes
import MerchantLogo from './MerchantLogo.jsx'
import { addDays, dayMonth, money } from '../lib/format.js'

export default function PurchaseCard({ plan: p, liquidado, onClick }) {
  const done = p.pagados >= p.total
  return (
    <button type="button" className={`purchase ${done ? 'is-done' : ''}`} data-reveal onClick={onClick}>
      <div className="purchase-top">
        <MerchantLogo id={p.comercio} size="sm" fallback={p.inicial} />
        <span className="purchase-count">{done ? liquidado : `${p.pagados}/${p.total}`}</span>
      </div>
      <b className="purchase-name">{p.nombre}</b>
      <div className="purchase-amt">{money(done ? p.monto * p.total : p.monto)}</div>
      <span className="purchase-sub">{done ? 'Pagado completo' : `Próximo pago · ${dayMonth(addDays(p.enDias))}`}</span>
      <div className="purchase-steps" aria-label={`${p.pagados} de ${p.total} pagos`}>
        {Array.from({ length: p.total }, (_, i) => (
          <i key={i} className={i < p.pagados ? 'on' : ''} />
        ))}
      </div>
    </button>
  )
}
