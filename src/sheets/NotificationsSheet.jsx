// Notificaciones (campana). Textos: hojas.notificaciones
import { useRef } from 'react'
import { Icon } from '../components/Icons.jsx'
import { hojas } from '../content.js'
import { gsap, useGSAP } from '../lib/gsap.js'

const t = hojas.notificaciones

export default function NotificationsSheet({ unread, onRead }) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from('.notif', { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.07, delay: 0.12, clearProps: 'transform,translate,rotate,scale,opacity,visibility' })
  }, { scope: ref })

  const read = () => {
    gsap.to('.notif-dot', { scale: 0, duration: 0.3, stagger: 0.05, ease: 'back.in(2)', onComplete: onRead })
  }

  return (
    <div ref={ref}>
      <div className="notif-list">
        {t.lista.map((n, i) => (
          <div key={i} className={`notif ${unread ? 'unread' : ''}`}>
            <span className="notif-ic"><Icon name={n.icon} /></span>
            <div className="notif-txt"><b>{n.titulo}</b><span>{n.sub}</span><em>{n.hace}</em></div>
            {unread && <i className="notif-dot" />}
          </div>
        ))}
      </div>
      {unread && <button className="btn ghost" onClick={read}>{t.marcarLeidas}</button>}
    </div>
  )
}
