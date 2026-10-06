// Hoja que sube desde abajo (bottom sheet). Se cierra con la X, tocando el fondo,
// con Escape o arrastrándola hacia abajo desde la barra superior.
import { useEffect } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { Close } from './Icons.jsx'

export default function Sheet({ open, onClose, title, children, dark = false }) {
  const drag = useDragControls()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="sheet" className="sheet-layer" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.div
            className="sheet-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            className={`sheet ${dark ? 'dark' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 34, stiffness: 340, mass: 0.9 }}
            drag="y"
            dragControls={drag}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={(_, info) => { if (info.offset.y > 110 || info.velocity.y > 650) onClose() }}
          >
            <div className="sheet-grab" onPointerDown={(e) => drag.start(e)}>
              <span className="sheet-grip" />
              {title && (
                <div className="sheet-head">
                  <h3>{title}</h3>
                  <button type="button" className="sheet-close" aria-label="Cerrar" onClick={onClose}><Close /></button>
                </div>
              )}
            </div>
            <div className="sheet-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
