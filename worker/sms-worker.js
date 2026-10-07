// ════════════════════════════════════════════════════════════
//  APLAZO HONEYPOT — Cloudflare Worker para SMS (Twilio)
//  Deploy: wrangler deploy  /  dashboard.cloudflare.com/workers
//
//  Variables de entorno en el Worker (NO en código):
//    TWILIO_SID      → Account SID de Twilio
//    TWILIO_TOKEN    → Auth Token de Twilio
//    TWILIO_FROM     → Número Twilio (ej. +19876543210)
//    ALERT_PHONE     → Tu número que recibirá los SMS (ej. +525512345678)
// ════════════════════════════════════════════════════════════

export default {
  async fetch(request, env) {
    // CORS — solo permite peticiones desde tu dominio
    const origin = request.headers.get('Origin') || ''
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'method not allowed' }), { status: 405, headers })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return new Response(JSON.stringify({ error: 'invalid json' }), { status: 400, headers })
    }

    const mensaje = body.mensaje || '🚨 Honeypot activado'

    // ── Enviar SMS vía Twilio ─────────────────────────────────
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_SID}/Messages.json`
    const params = new URLSearchParams({
      To:   env.ALERT_PHONE,
      From: env.TWILIO_FROM,
      Body: mensaje.slice(0, 1600),   // límite SMS
    })

    const twilioRes = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${env.TWILIO_SID}:${env.TWILIO_TOKEN}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const twilioData = await twilioRes.json()

    if (!twilioRes.ok) {
      console.error('Twilio error:', twilioData)
      return new Response(JSON.stringify({ ok: false, error: twilioData }), { status: 500, headers })
    }

    return new Response(JSON.stringify({ ok: true, sid: twilioData.sid }), { headers })
  }
}
