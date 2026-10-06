// Formato de dinero, fechas y textos con {variables}.

const MXN = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 })

// 6255 -> '$6,255'   ·   -625 -> '-$625'   ·   signo: true -> '+$48'
export function money(n, { signo = false } = {}) {
  const v = Math.round(n)
  const s = `$${MXN.format(Math.abs(v))}`
  if (v < 0) return `-${s}`
  return signo && v > 0 ? `+${s}` : s
}

// 'Pago {n} de {total}' + { n: 3, total: 4 } -> 'Pago 3 de 4'
export function fill(text, vars) {
  return String(text).replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`))
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

export function addDays(days, from = new Date()) {
  const d = new Date(from)
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() + days)
  return d
}

export const dayMonth = (d) => `${d.getDate()} ${MESES[d.getMonth()]}`
export const monthShort = (d) => MESES[d.getMonth()].toUpperCase()

// Texto relativo: 'Hoy', 'Ayer', '28 sep'
export function relDay(haceDias) {
  if (haceDias <= 0) return 'Hoy'
  if (haceDias === 1) return 'Ayer'
  return dayMonth(addDays(-haceDias))
}

// 'mañana', 'en 9 días', 'el 15 oct'
export function dueText(enDias) {
  if (enDias <= 0) return 'hoy'
  if (enDias === 1) return 'mañana'
  if (enDias <= 14) return `en ${enDias} días`
  return `el ${dayMonth(addDays(enDias))}`
}

export function greeting(saludos, h = new Date().getHours()) {
  if (h < 12) return saludos.manana
  if (h < 19) return saludos.tarde
  return saludos.noche
}

export const nowTime = () => new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false })

// '5512345678' -> '55 1234 5678'
export function formatPhone(digits) {
  const d = digits.replace(/\D/g, '')
  return [d.slice(0, 2), d.slice(2, 6), d.slice(6, 10)].filter(Boolean).join(' ')
}

export const randomCode = (len = 6) => Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('')
