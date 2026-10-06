import { brand } from '../content.js'

export default function Logo({ size = 'md' }) {
  return (
    <div className="logo">
      <div className="logo-mark" style={size === 'lg' ? { width: 44, height: 44, borderRadius: 14 } : null}>
        <svg width={size === 'lg' ? 24 : 18} height={size === 'lg' ? 24 : 18} viewBox="0 0 24 24" fill="none">
          <path d="M12 2a10 10 0 100 20 10 10 0 00-6-18" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3.4" fill="#68d7e8" />
        </svg>
      </div>
      <div className="logo-word">{brand.nombre1}<span>{brand.nombre2}</span></div>
    </div>
  )
}
