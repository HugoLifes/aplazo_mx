// Barra de estado del teléfono con la hora real.
import { useEffect, useState } from 'react'
import { nowTime } from '../lib/format.js'

export default function StatusBar() {
  const [time, setTime] = useState(nowTime)

  useEffect(() => {
    const id = setInterval(() => setTime(nowTime()), 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="status-bar">
      <span className="sb-time">{time}</span>
      <span className="sb-icons" aria-hidden="true">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2.2c2.1 0 4 .8 5.4 2.1l1.1-1.2A9.3 9.3 0 007.5.5 9.3 9.3 0 001 3.1l1.1 1.2A7.6 7.6 0 017.5 2.2z" />
          <path d="M7.5 5.4c1.2 0 2.3.4 3.1 1.2l1.1-1.2a6.2 6.2 0 00-8.4 0l1.1 1.2c.8-.8 1.9-1.2 3.1-1.2z" />
          <circle cx="7.5" cy="9.3" r="1.6" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
          <path d="M24 4v4a2 2 0 000-4z" fill="currentColor" opacity="0.45" />
        </svg>
      </span>
    </div>
  )
}
