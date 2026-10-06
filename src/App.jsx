import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Welcome from './screens/Welcome.jsx'
import PhoneStep from './screens/PhoneStep.jsx'
import OtpStep from './screens/OtpStep.jsx'
import Dashboard from './screens/Dashboard.jsx'
import { brandName } from './lib/brand.js'

const STEPS = ['welcome', 'phone', 'otp', 'dashboard']

export default function App() {
  const [step, setStep] = useState('welcome')
  const [phone, setPhone] = useState('')

  const go = (s) => setStep(s)
  const idx = STEPS.indexOf(step)

  const screens = {
    welcome: <Welcome onNext={() => go('phone')} />,
    phone: <PhoneStep phone={phone} setPhone={setPhone} onBack={() => go('welcome')} onNext={() => go('otp')} />,
    otp: <OtpStep phone={phone} onBack={() => go('phone')} onNext={() => go('dashboard')} />,
    dashboard: <Dashboard onRestart={() => { setPhone(''); go('welcome') }} />,
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="stage">
      <div className="stage-head">
        <span className="stage-badge">Demo UX/UI · <b>marca ficticia</b></span>
        <h1>{brandName} — Flujo de onboarding &amp; dashboard</h1>
        <p>Prototipo de interfaz. Datos de muestra, sin conexión a ningún servicio real.</p>
      </div>

      <div className="phone">
        <div className="phone-screen">
          <div className="status-bar">
            <span>9:41</span>
            <span className="dots"><i /><i /><i /> &nbsp;{brandName}</span>
            <span>100%</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="center-col"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flex: 1, minHeight: 0 }}
            >
              {screens[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="stage-foot">
        Paso <b>{Math.min(idx + 1, 4)} de 4</b> · Este prototipo usa una marca inventada
        (<b>{brandName}</b>) y datos ficticios. No representa ni se conecta con ninguna empresa real,
        y los campos de código son solo decorativos para la demo. Los logos de comercios
        pertenecen a sus respectivos dueños y se usan solo como referencia visual.
      </p>
    </div>
    </MotionConfig>
  )
}
