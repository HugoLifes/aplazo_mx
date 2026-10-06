// Tarjeta de tienda asociada: logo centrado + beneficio. Datos: comercios (content.js)
import MerchantLogo from './MerchantLogo.jsx'

export default function MerchantCard({ merchant: m, onClick }) {
  return (
    <button type="button" className="merchant" onClick={onClick} aria-label={`${m.nombre} · ${m.beneficio}`}>
      <span className="merchant-logo">
        <MerchantLogo id={m.id} size="fill" />
      </span>
      <span className="merchant-tag">{m.beneficio}</span>
    </button>
  )
}
