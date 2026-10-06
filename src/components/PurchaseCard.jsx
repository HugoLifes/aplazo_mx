// Tarjeta de una compra a plazos ("Tus compras"). Datos: dashboard.planes
import { motion } from 'framer-motion'
import MerchantLogo from './MerchantLogo.jsx'

export default function PurchaseCard({ plan: p, delay = 0 }) {
  return (
    <motion.div
      className="purchase"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ y: -3 }}
    >
      <div className="purchase-top">
        <MerchantLogo id={p.comercio} size="sm" fallback={p.inicial} />
        <span className="purchase-count">{p.pagados}/{p.total}</span>
      </div>
      <b className="purchase-name">{p.nombre}</b>
      <div className="purchase-amt">{p.proximo}</div>
      <span className="purchase-sub">Próximo pago · {p.fecha}</span>
      <div className="purchase-steps" aria-label={`${p.pagados} de ${p.total} pagos`}>
        {Array.from({ length: p.total }, (_, i) => (
          <i key={i} className={i < p.pagados ? 'on' : ''} />
        ))}
      </div>
    </motion.div>
  )
}
