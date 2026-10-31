// Pantalla 1: NÚMERO — fiel a captura Aplazo
// MODULAR: usa BrandMark / InfoCard / AuthFooterLinks
// Para cambiar la imagen superior: src/content.js -> brand.logo o pon tu PNG en src/assets/brand/
import { useEffect, useRef } from 'react'
import { Check, MexicoFlag } from '../components/Icons.jsx'
import { BrandMark, BackLink } from '../components/auth/AuthHeader.jsx'
import InfoCard from '../components/auth/InfoCard.jsx'
import AuthFooterLinks from '../components/auth/AuthFooterLinks.jsx'
import { phone as t, brand as brandCfg } from '../content.js'
import { fill, formatPhone } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'

function clean(v){ let d=v.replace(/\D/g,''); if(d.length>t.digitos && d.startsWith('52')) d=d.slice(2); return d.slice(0,t.digitos) }

export default function PhoneStep({ phone, setPhone, onBack, onNext }){
  const root=useRef(null); const input=useRef(null)
  const valid = phone.length===t.digitos
  const faltan = t.digitos - phone.length

  useGSAP(()=>{ gsap.timeline()
    .from('.auth-logo-wrap',{y:10, autoAlpha:0, duration:.5})
    .from('.auth-title > *',{y:14, autoAlpha:0, duration:.45, stagger:.06},'-=.2')
    .from('.phone-input',{y:14, autoAlpha:0, duration:.45},'-=.1')
    .from('.auth-btn',{y:14, autoAlpha:0, duration:.45},'-=.2')
    .from('.auth-info-card',{y:14, autoAlpha:0, duration:.45},'-=.25')
    .from('.auth-footer-links a',{y:8, autoAlpha:0, duration:.4, stagger:.07},'-=.2')
  },{scope:root})

  useGSAP(()=>{ if(valid) gsap.fromTo('.pi-ok',{scale:0,rotate:-40},{scale:1,rotate:0,duration:.45, ease:'back.out(2.4)'})},{scope:root,dependencies:[valid]})

  useEffect(()=>{ const id=setTimeout(()=>input.current?.focus({preventScroll:true}),400); return ()=>clearTimeout(id)},[])

  const submit=e=>{
    e.preventDefault()
    if(valid) onNext()
    else gsap.fromTo('.phone-input',{x:0},{x:0,duration:.4,keyframes:{x:[0,-8,8,-5,5,0]}})
  }

  // Logo: si existe brand.logo se muestra. Si no, blob celeste placeholder (igual a captura)
  const logoSrc = brandCfg.logo ? `/src/assets/brand/${brandCfg.logo}` : null

  return (
    <form className="screen-body auth-screen" ref={root} onSubmit={submit} noValidate>
      {/* Flecha arriba izquierda como en captura */}
      <div className="auth-topbar">
        <BackLink onClick={onBack||(()=>{})} />
      </div>

      <BrandMark src={logoSrc} />

      <header className="auth-title">
        <h1>{t.titulo}</h1>
        <p>{t.descripcion}</p>
      </header>

      <div className="field auth-field">
        <label htmlFor="tel">{t.etiquetaCampo}</label>
        <div className={`phone-input ${valid?'ok':''}`}>
          <span className="cc"><span className="flag"><MexicoFlag width={22} height={15} /></span> {t.lada}</span>
          <input id="tel" ref={input} type="tel" inputMode="numeric" autoComplete="tel-national"
            placeholder={t.placeholder} value={formatPhone(phone)} onChange={e=>setPhone(clean(e.target.value))} />
          <span className="pi-ok" aria-hidden={!valid} style={{visibility: valid?'visible':'hidden'}}><Check/></span>
        </div>
        <span className={`field-hint ${valid?'ok':''}`}>{phone.length===0?' ': valid? t.ayudaListo : fill(t.ayudaFaltan,{n:faltan})}</span>
      </div>

      <button type="submit" className="btn auth-btn" disabled={!valid}>{t.botonPrincipal}</button>

      <InfoCard title={t.seguridadTitulo} text={t.seguridadSub} />

      <AuthFooterLinks links={[
        { label: t.linkCambioNumero || '¿Cambiaste tu número de teléfono?' },
        { label: t.linkVender || '¿Quieres vender con APLAZO?' },
      ]} />

      <p className="legal" style={{marginTop:14}}>{t.terminos}</p>
    </form>
  )
}
