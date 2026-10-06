// Marca propia. Para cambiar los logos -> src/content.js (brand) + src/assets/brand/
import { brand } from '../content.js'
import { brandName, brandSymbolUrl, brandLogoUrl } from '../lib/brand.js'

// Solo el símbolo (sin texto). Se reutiliza en el logo, la bienvenida, la tarjeta y los movimientos.
// Si hay un archivo en brand.simbolo se usa ese; si no, el símbolo dibujado en código.
export function BrandMark({ size = 18, color = '#fff' }) {
  if (brandSymbolUrl) {
    return <img className="brand-mark-img" src={brandSymbolUrl} alt="" width={size} height={size} aria-hidden="true" />
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 00-6-18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.4" fill="#68d7e8" />
    </svg>
  )
}

export default function Logo({ size = 'md' }) {
  const lg = size === 'lg'

  // Logo completo en imagen (brand.logo)
  if (brandLogoUrl) {
    return <img className={`logo-img ${lg ? 'lg' : ''}`} src={brandLogoUrl} alt={brandName} />
  }

  return (
    <div className="logo">
      <div className={`logo-mark ${lg ? 'lg' : ''}`}>
        <BrandMark size={lg ? 24 : 18} />
      </div>
      <div className="logo-word">{brand.nombre1}<span>{brand.nombre2}</span></div>
    </div>
  )
}
