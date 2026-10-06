// Configuración central de GSAP: plugins, curvas y respeto a "reducir movimiento".
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

gsap.defaults({ ease: 'power3.out', duration: 0.7 })

// Si la persona pidió menos movimiento en su sistema, las animaciones van directo al final.
export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (reducedMotion()) gsap.globalTimeline.timeScale(20)

export { gsap, ScrollTrigger, useGSAP }
