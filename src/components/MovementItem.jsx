// Fila de "Movimientos". Datos: dashboard.movimientos
import { motion } from 'framer-motion'
import MerchantLogo from './MerchantLogo.jsx'
import { Check, Gift } from './Icons.jsx'

export default function MovementItem({ item: m, delay = 0 }) {
  return (
    <motion.div className="tx" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <span className="tx-ic">
        {m.comercio ? <MerchantLogo id={m.comercio} size="xs" /> : <span className="tx-emoji">{m.emoji}</span>}
        {m.tipo === 'pago' && <i className="tx-badge ok"><Check /></i>}
        {m.tipo === 'cashback' && <i className="tx-badge gift"><Gift /></i>}
      </span>
      <div className="tx-meta"><b>{m.titulo}</b><span>{m.sub}</span></div>
      <div className={`tx-amt ${m.entrada ? 'in' : ''}`}>{m.monto}</div>
    </motion.div>
  )
}
