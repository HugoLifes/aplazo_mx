// Logo de un comercio (PNG de src/assets/logos/, ver src/lib/merchants.js).
// Si todavía no existe el archivo, pinta un respaldo (nombre o monograma)
// para que el layout no se rompa.
import { getLogoUrl, getMerchant } from '../lib/merchants.js'
import { BrandMark } from './Logo.jsx'

// size: 'xs' (movimientos), 'sm' (compras), 'md' (próximo pago),
//       'chip' (tira de bienvenida), 'fill' (ocupa la caja de su contenedor)
export default function MerchantLogo({ id, size = 'sm', fallback }) {
  if (id === 'quincena') {
    return <span className={`mlogo mlogo--${size} mlogo--brand`}><BrandMark size={size === 'xs' ? 18 : 22} /></span>
  }

  const m = getMerchant(id)
  const src = getLogoUrl(id)

  return (
    <span className={`mlogo mlogo--${size}${src ? '' : ' mlogo--empty'}`}>
      {src ? (
        <img src={src} alt={m.nombre} loading="lazy" draggable="false" />
      ) : size === 'chip' || size === 'fill' ? (
        <span className="mlogo-name">{m.nombre}</span>
      ) : (
        <span
          className="mlogo-mono"
          style={{ background: m.color || 'var(--surface-strong)', color: m.tinta || '#fff' }}
          aria-label={m.nombre}
        >
          {fallback || (m.nombre || '?').charAt(0)}
        </span>
      )}
    </span>
  )
}
