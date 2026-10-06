// Tarjeta "Próximo pago". Datos: dashboard.proximoPago
import { motion } from 'framer-motion'
import MerchantLogo from './MerchantLogo.jsx'
import { getMerchant } from '../lib/merchants.js'

export default function PaymentCard({ data: p, onSeePayments }) {
  const m = getMerchant(p.comercio)

  return (
    <motion.div
      className="pay-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22 }}
    >
      <div className="pay-top">
        <span className="pay-eyebrow"><i /> {p.titulo}</span>
        <div className="pay-date"><b>{p.dia}</b><span>{p.mes}</span></div>
      </div>

      <div className="pay-main">
        <MerchantLogo id={p.comercio} size="md" />
        <div className="pay-meta">
          <b>{m.nombre}</b>
          <span>{p.sub}</span>
        </div>
        <div className="pay-amount">{p.monto}</div>
      </div>

      <div className="pay-actions">
        <motion.button type="button" className="pill ghost" onClick={onSeePayments} whileTap={{ scale: 0.96 }}>
          {p.botonSecundario}
        </motion.button>
        <motion.button type="button" className="pill" whileTap={{ scale: 0.96 }}>
          {p.boton}
        </motion.button>
      </div>
    </motion.div>
  )
}
