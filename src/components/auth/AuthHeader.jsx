// Logo de marca en las pantallas de autenticación.
// El PNG vive en src/assets/brand/ (importado por Vite -> funciona en el build de Vercel).
// Para cambiarlo: reemplaza src/assets/brand/aplazo-pill.png o edita brand.logo en src/content.js
import logoPill from '../../assets/brand/aplazo-pill.png'
import { brand } from '../../content.js'

export function BackLink({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="auth-back" aria-label="Volver">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  )
}

export function BrandMark({ src, alt = 'Aplazo' }) {
  return (
    <div className="auth-logo-wrap">
      <img src={src || logoPill} alt={alt} className="auth-logo-img" />
    </div>
  )
}
