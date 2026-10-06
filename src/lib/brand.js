// Logos de la marca propia. Los archivos viven en src/assets/brand/ y se eligen
// por nombre desde src/content.js -> brand (simbolo, logo, logoTarjeta).
import { brand } from '../content.js'

const files = import.meta.glob('../assets/brand/*.{png,webp,svg,jpg,jpeg}', { eager: true, import: 'default' })

const base = (s) => s.split('/').pop().replace(/\.\w+$/, '').toLowerCase()

const BY_NAME = {}
for (const [path, url] of Object.entries(files)) BY_NAME[base(path)] = url

// 'simbolo', 'simbolo.png' y 'Simbolo.PNG' encuentran el mismo archivo.
export function brandAsset(name) {
  return name ? BY_NAME[base(name)] || null : null
}

export const brandName = `${brand.nombre1}${brand.nombre2}`
export const brandSymbolUrl = brandAsset(brand.simbolo)
export const brandLogoUrl = brandAsset(brand.logo)
export const brandCardLogoUrl = brandAsset(brand.logoTarjeta)
