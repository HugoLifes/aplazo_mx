// Perfil: datos de la cuenta, ajustes y cerrar sesión. Textos: hojas.perfil + usuario
import { useRef } from 'react'
import { ChevronRight, Icon, Logout } from '../components/Icons.jsx'
import { hojas, phone as tPhone, usuario } from '../content.js'
import { formatPhone } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'

const t = hojas.perfil

export default function ProfileSheet({ phone, onLogout }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.timeline({ delay: 0.1 })
      .from('.profile-ava', { scale: 0.5, autoAlpha: 0, duration: 0.6, ease: 'back.out(2)' })
      .from('[data-in]', { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.05, clearProps: 'transform,translate,rotate,scale,opacity,visibility' }, 0.1)
  }, { scope: ref })

  return (
    <div ref={ref}>
      <div className="profile-top">
        <span className="profile-ava">{usuario.nombre.charAt(0)}</span>
        <b data-in>{usuario.nombre} {usuario.apellido}</b>
        <span className="profile-level" data-in>{usuario.nivel}</span>
      </div>

      <div className="profile-row static" data-in>
        <span>{t.telefono}</span>
        <b>{tPhone.lada} {phone ? formatPhone(phone) : tPhone.placeholder}</b>
      </div>

      <div className="options">
        {t.opciones.map((o, i) => (
          <button key={i} type="button" className="option" data-in>
            <span className="option-ic"><Icon name={o.icon} /></span>
            <span className="option-txt"><b>{o.titulo}</b><span>{o.sub}</span></span>
            <ChevronRight className="option-chev" />
          </button>
        ))}
      </div>

      <button className="btn ghost danger" data-in onClick={onLogout}><Logout /> {t.cerrarSesion}</button>
    </div>
  )
}
