# Quincena — Demo UX/UI

Prototipo de interfaz (solo diseño) de una app ficticia de **BNPL** ("compra hoy, paga en 4 quincenas"), construido con **React + Vite** y **Framer Motion**.

> ⚠️ **Marca y datos 100% ficticios.** "Quincena" es una marca inventada; no representa ni se conecta con ninguna empresa real. Los datos son de muestra y los campos de verificación son **decorativos** (no envían ni validan ningún código). Es una pieza de portafolio de UI/UX.

## Pantallas

1. **Bienvenida** — hero animado, beneficios y prueba social.
2. **Teléfono** — captura con formato en vivo, validación y onboarding tipo wizard.
3. **Verificación (OTP)** — 6 dígitos con auto-avance + transición "Verificando → ✓" (decorativa).
4. **Dashboard** — tarjeta de crédito, insight de gasto, próximo pago, planes activos y movimientos con control segmentado.

## Diseño

- Paleta violeta / lima sobre fondo *plum* oscuro.
- Glassmorphism, luz ambiental animada y grano sutil.
- Tipografías *Space Grotesk* (display) + *Plus Jakarta Sans*.
- Micro-interacciones con Framer Motion.
- Patrones de fintech 2026: onboarding por pasos, dashboard accionable, gradientes suaves y tipografía fuerte.

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Stack

- React 18
- Vite 5
- Framer Motion 11
