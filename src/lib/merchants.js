// Registro de comercios + logos.
// Busca los PNG en src/assets/logos/ por el id del comercio (ver src/content.js -> comercios).
import { comercios } from '../content.js'

// Vite incluye en el build todos los archivos de la carpeta (si está vacía, queda {}).
const files = import.meta.glob('../assets/logos/*.{png,webp,svg}', { eager: true, import: 'default' })

// 'Mercado Libre.png', 'mercado_libre.png' y 'mercado-libre.png' -> 'mercadolibre'
const norm = (s) => s.replace(/\.(png|webp|svg)$/i, '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '')

const LOGOS = {}
for (const [path, url] of Object.entries(files)) {
  LOGOS[norm(path.split('/').pop().replace(/\.\w+$/, ''))] = url
}

const BY_ID = {}
for (const c of comercios) {
  BY_ID[c.id] = c
  if (c.alias) {
    for (const a of c.alias) {
      BY_ID[a] = c
    }
  }
}

export function getMerchant(id) {
  return BY_ID[id] || { id, nombre: id || '' }
}

// Orden de búsqueda: `logo` (archivo elegido a mano en content.js) -> id -> alias
export function getLogoUrl(id) {
  const m = getMerchant(id)
  for (const key of [m.logo, m.id, ...(m.alias || [])]) {
    if (key && LOGOS[norm(key)]) return LOGOS[norm(key)]
  }
  return null
}
