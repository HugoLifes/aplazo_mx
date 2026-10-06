// Pantalla de BIENVENIDA.
// ¿Cambiar textos, beneficios o la prueba social? -> edita src/content.js (sección "welcome").
// ¿Cambiar el diseño (colores, tamaños)? -> edita src/styles.css (busca ".hero-", ".feat-" y ".marquee").
// Animaciones: GSAP (timeline de entrada + bucles del ícono, chips y tira de logos).
import { useRef } from 'react'
import Logo, { BrandMark } from '../components/Logo.jsx'
import { Arrow, Icon } from '../components/Icons.jsx'
import MerchantLogo from '../components/MerchantLogo.jsx'
import { welcome, comercios } from '../content.js'
import { gsap, useGSAP } from '../lib/gsap.js'

const tiendas = comercios.filter((c) => c.catalogo !== false)

// 'Compra hoy,\npaga en quincenas' -> líneas -> palabras con máscara para el reveal
function MaskedTitle({ text }) {
  return (
    <h2 className="display masked">
      {text.split('\n').map((line, i) => (
        <span key={i} className="line">
          {line.split(' ').map((w, j) => (
            <span key={j}><span className="w"><span className="wi">{w}</span></span>{' '}</span>
          ))}
        </span>
      ))}
    </h2>
  )
}

export default function Welcome({ onNext }) {
  const root = useRef(null)
  const marquee = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    // fromTo con valores finales explícitos: robusto aunque React monte dos veces (StrictMode)
    const show = { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0 }
    tl.fromTo('.welcome-logo', { y: -14, autoAlpha: 0 }, { ...show, duration: 0.6 })
      .fromTo('.hero-orbit .ring', { scale: 0.55, autoAlpha: 0 }, { ...show, duration: 1, stagger: 0.12, ease: 'expo.out' }, 0.05)
      .fromTo('.hero-coin', { scale: 0.3, rotation: -25, autoAlpha: 0 }, { ...show, duration: 1, ease: 'back.out(1.8)' }, 0.15)
      .fromTo('.hero-chip', { scale: 0.6, autoAlpha: 0, y: 12 }, { ...show, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }, 0.55)
      .fromTo('.masked .wi', { yPercent: 115, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.06, ease: 'expo.out' }, 0.35)
      .fromTo('.screen-head .lead', { y: 14, autoAlpha: 0 }, { ...show, duration: 0.7 }, 0.7)
      .fromTo('.feat-tile', { y: 20, autoAlpha: 0, scale: 0.94 }, { ...show, duration: 0.6, stagger: 0.08, ease: 'back.out(1.6)' }, 0.8)
      .fromTo('.marquee', { autoAlpha: 0, y: 12 }, { ...show, duration: 0.7 }, 1.0)
      .fromTo('.trust', { autoAlpha: 0, y: 10 }, { ...show, duration: 0.6 }, 1.1)
      .fromTo('.cta-bar > *', { y: 26, autoAlpha: 0 }, { ...show, duration: 0.7, stagger: 0.08, clearProps: 'transform,translate,rotate,scale,opacity,visibility' }, 0.9)

    // Bucles sutiles (después de la entrada)
    gsap.to('.hero-coin', { y: -10, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.1 })
    gsap.to('.hero-chip.c1', { y: -7, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2 })
    gsap.to('.hero-chip.c2', { y: 7, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.3 })
    gsap.to('.hero-orbit .r2', { rotation: 360, duration: 60, ease: 'none', repeat: -1 })

    // Tira de logos infinita: la pista tiene la lista duplicada, se mueve la mitad y repite.
    const loop = gsap.to('.marquee-track', { xPercent: -50, duration: 30, ease: 'none', repeat: -1 })
    const el = marquee.current
    const slow = () => gsap.to(loop, { timeScale: 0.15, duration: 0.6 })
    const fast = () => gsap.to(loop, { timeScale: 1, duration: 0.6 })
    el.addEventListener('pointerenter', slow)
    el.addEventListener('pointerleave', fast)
    return () => { el.removeEventListener('pointerenter', slow); el.removeEventListener('pointerleave', fast) }
  }, { scope: root })

  return (
    <div className="screen-body" ref={root}>
      <div className="welcome-logo">
        <Logo size="lg" />
      </div>

      <div className="hero-orbit">
        <div className="ring r2" />
        <div className="ring r1" />
        <div className="hero-coin"><BrandMark size={52} /></div>
        <div className="hero-chip c1"><span className="d" style={{ background: '#68d7e8' }} /> {welcome.chipArriba}</div>
        <div className="hero-chip c2"><span className="d" style={{ background: '#151537' }} /> {welcome.chipAbajo}</div>
      </div>

      {/* El título puede tener un salto de línea con \n en content.js */}
      <header className="screen-head center">
        <MaskedTitle text={welcome.titulo} />
        <p className="lead">{welcome.descripcion}</p>
      </header>

      <div className="feat-tiles">
        {welcome.beneficios.map((f, i) => (
          <div key={i} className="feat-tile" title={f.sub}>
            <span className="fi"><Icon name={f.icon} /></span>
            <b>{f.titulo}</b>
          </div>
        ))}
      </div>

      {/* Tira animada de logos de tiendas asociadas */}
      <div className="marquee" ref={marquee} aria-label={welcome.tiendasTitulo}>
        <span className="marquee-title">{welcome.tiendasTitulo}</span>
        <div className="marquee-mask">
          <div className="marquee-track">
            {[...tiendas, ...tiendas].map((m, i) => (
              <span key={i} className="marquee-item" aria-hidden={i >= tiendas.length}>
                <MerchantLogo id={m.id} size="chip" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="trust">
        <div className="trust-users">
          <div className="avatars">
            <i style={{ background: 'linear-gradient(135deg,#151537,#3a3a7a)' }} />
            <i style={{ background: 'linear-gradient(135deg,#b8a9ed,#d0c5f5)' }} />
            <i style={{ background: 'linear-gradient(135deg,#68d7e8,#9fe8f2)' }} />
          </div>
          <span><b style={{ color: 'var(--txt)' }}>{welcome.usuarios}</b> {welcome.usuariosSub}</span>
        </div>
        <div className="sep" />
        <div><span className="stars">★★★★★</span> <b>{welcome.rating}</b> <span>{welcome.ratingSub}</span></div>
      </div>

      <div className="spacer" />
      <div className="cta-bar">
        <button className="btn" onClick={onNext}>{welcome.botonPrincipal} <Arrow /></button>
        <button className="btn-link" onClick={onNext}>
          {welcome.botonSecundario}<b>{welcome.botonSecundarioResalte}</b>
        </button>
      </div>
    </div>
  )
}
