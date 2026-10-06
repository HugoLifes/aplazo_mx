// Registro de comercios + logos.
// Busca los PNG en src/assets/logos/ por el id del comercio (ver src/content.js -> comercios).
import { comercios } from '../content.js'

// Vite incluye en el build todos los archivos de la carpeta (si está vacía, queda {}).
const files = import.meta.glob('../assets/logos/*.{png,webp,svg}', { eager: true, import: 'default' })

// 'Mercado Libre.png', 'mercado_libre.png' y 'mercado-libre.png' -> 'mercadolibre'
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '')

const LOGOS = {}
for (const [path, url] of Object.entries(files)) {
  LOGOS[norm(path.split('/').pop().replace(/\.\w+$/, ''))] = url
}

const BY_ID = Object.fromEntries(comercios.map((c) => [c.id, c]))

export function getMerchant(id) {
  return BY_ID[id] || { id, nombre: id || '' }
}

export function getLogoUrl(id) {
  const m = getMerchant(id)
  for (const key of [m.id, ...(m.alias || [])]) {
    if (key && LOGOS[norm(key)]) return LOGOS[norm(key)]
  }
  return null
}
