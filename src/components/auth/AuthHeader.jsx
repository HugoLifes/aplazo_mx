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

export function BrandMark({ src, alt = "Aplazo" }) {
  // POSICIÓN CORRECTA DE LA IMAGEN: centrada arriba, ancho 160px.
  // Para cambiarla edita src/content.js -> brand.logo o reemplaza /src/assets/brand/logo.png
  const logoSrc = src || brand.logo || ""
  return (
    <div className="auth-logo-wrap">
      {logoSrc ? (
        <img src={logoSrc} alt={alt} className="auth-logo-img" />
      ) : (
        <div className="auth-logo-placeholder">
          {/* Placeholder turquesa como en la captura — reemplaza por <img> cuando tengas el PNG */}
          <span className="auth-logo-blob" />
        </div>
      )}
    </div>
  )
}
