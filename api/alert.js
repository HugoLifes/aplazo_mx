// Vercel Serverless Function para enviar alertas
// Soporta: Twilio SMS y Telegram Bot

export default async function handler(req, res) {
  // Configuración de cabeceras CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mensaje, sesion } = req.body || {};
  const alertText = mensaje || '🚨 Alerta recibida desde Honeypot Aplazo';

  const resultados = {
    telegram: null,
    twilio: null,
  };

  // 1. Enviar por Telegram (si están configuradas las variables)
  const tgToken = process.env.TG_TOKEN || process.env.VITE_TG_TOKEN;
  const tgChat = process.env.TG_CHAT || process.env.VITE_TG_CHAT;

  if (tgToken && tgChat) {
    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChat,
          text: alertText,
          parse_mode: 'HTML',
        }),
      });
      const tgData = await tgRes.json();
      resultados.telegram = { ok: tgRes.ok, data: tgData };
    } catch (err) {
      resultados.telegram = { ok: false, error: err.message };
    }
  }

  // 2. Enviar por Twilio SMS (si están configuradas las variables)
  const twilioSid = process.env.TWILIO_SID;
  const twilioToken = process.env.TWILIO_TOKEN;
  const twilioFrom = process.env.TWILIO_FROM;
  const alertPhone = process.env.ALERT_PHONE || '+527223570615';

  if (twilioSid && twilioToken && twilioFrom) {
    try {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const params = new URLSearchParams({
        To: alertPhone,
        From: twilioFrom,
        Body: alertText.slice(0, 1600),
      });

      const twilioRes = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      const twilioData = await twilioRes.json();
      resultados.twilio = { ok: twilioRes.ok, data: twilioData };
    } catch (err) {
      resultados.twilio = { ok: false, error: err.message };
    }
  }

  return res.status(200).json({
    ok: true,
    resultados,
  });
}
