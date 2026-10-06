// Tarjeta de tienda asociada: logo centrado + beneficio. Datos: comercios (content.js)
import { motion } from 'framer-motion'
import MerchantLogo from './MerchantLogo.jsx'

export default function MerchantCard({ merchant: m, delay = 0 }) {
  return (
    <motion.button
      type="button"
      className="merchant"
      layout
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="merchant-logo">
        <MerchantLogo id={m.id} size="fill" />
      </span>
      <span className="merchant-tag">{m.beneficio}</span>
    </motion.button>
  )
}
