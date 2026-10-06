// Acceso rápido circular (Escanear, Comprar, Pagos…). Datos: dashboard.acciones
import { motion } from 'framer-motion'
import { Icon } from './Icons.jsx'

export default function QuickAction({ action: q, delay = 0, onClick }) {
  return (
    <motion.button
      type="button"
      className="quick"
      onClick={onClick}
      title={`${q.titulo} · ${q.sub}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className={`ic ${q.color || ''}`}>
        <Icon name={q.icon} />
        {q.badge ? <em>{q.badge}</em> : null}
      </span>
      <b>{q.corto || q.titulo}</b>
      <span className="sub">{q.sub}</span>
    </motion.button>
  )
}
