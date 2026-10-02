# 🗺️ Guía rápida — ¿dónde cambio cada cosa?

Esta guía es para editar el proyecto **sin perderte**. No necesitas ser experto:
casi todo lo que vas a querer cambiar está en **un solo archivo**.

> 💡 El servidor recarga solo: guarda el archivo y el cambio se ve al instante en el navegador.
> Para arrancarlo: `npm run dev` y abre http://localhost:5173

---

## ✍️ Cambiar TEXTOS, montos, nombres, comercios…

👉 **Todo está en [`src/content.js`](src/content.js)** — es la "zona segura".

Ahí encuentras, por secciones:

| Quieres cambiar… | Busca en content.js la sección… |
|---|---|
| Nombre de la marca | `brand` |
| Pantalla de bienvenida (título, beneficios, reseñas) | `welcome` |
| Pantalla de teléfono (textos, LADA, placeholder) | `phone` |
| Pantalla de código/OTP (textos, aviso de demo) | `otp` |
| Dashboard: saludo, tarjeta, monto, insight, próximo pago | `dashboard` |
| Accesos rápidos (los 4 cuadros) | `dashboard.acciones` |
| Planes activos (Liverpool, etc.) | `dashboard.planes` |
| Movimientos (Compras / Pagos) | `dashboard.movimientos` |

**Reglas simples al editar texto:**
- El texto va entre comillas: `'cámbiame'`.
- Salto de línea en un título: usa `\n` → `'Hola\nmundo'`.
- Para íconos, escribe el **nombre**: `bolt`, `shield`, `gift`, `cart`, `scan`,
  `wallet`, `chart`, `spark`, `calendar`, `bell`.
- No borres las comas `,` ni los corchetes `[ ]` `{ }`; solo cambia lo de adentro.

---

## 🎨 Cambiar COLORES y tipografía

👉 **[`src/styles.css`](src/styles.css)**, bloque `:root` al inicio (todo comentado en español).

- Cambia un color (ej. `--violet: #7c6cff;`) y **toda** la app se re-colorea sola.
- `--violet` = color principal · `--lime` = color de acento · `--bg-1` = fondo del teléfono.

---

## 🧩 Cambiar el DISEÑO de una parte específica

👉 También en **[`src/styles.css`](src/styles.css)**. Está dividido en secciones con
comentarios `/* ---------- Nombre ---------- */`. Usa **Ctrl+F** para saltar:

| Parte visual | Busca en styles.css |
|---|---|
| Botones | `.btn` |
| Campo de teléfono | `.phone-input` |
| Casillas del código | `.otp-cell` |
| Tarjeta de crédito | `.credit-card` |
| Accesos rápidos | `.quick` |
| Planes | `.plan` |
| Movimientos | `.tx` |
| Barra inferior | `.tabbar` |

---

## 🖥️ Entender las PANTALLAS (si quieres codear)

Cada pantalla es un archivo en [`src/screens/`](src/screens/) y arriba tiene un
comentario que dice qué editar:

- [`Welcome.jsx`](src/screens/Welcome.jsx) — bienvenida
- [`PhoneStep.jsx`](src/screens/PhoneStep.jsx) — teléfono
- [`OtpStep.jsx`](src/screens/OtpStep.jsx) — código + animación de verificación
- [`Dashboard.jsx`](src/screens/Dashboard.jsx) — panel

El orden del flujo (qué pantalla sigue a cuál) está en [`src/App.jsx`](src/App.jsx).

---

## ⏱️ Cosas puntuales

- **Velocidad de la animación "Verificando → ✓":** en [`OtpStep.jsx`](src/screens/OtpStep.jsx),
  función `verify()` (los números en milisegundos).
- **Agregar/quitar un beneficio, acción, plan o movimiento:** copia un bloque
  `{ ... }` dentro de su lista en `content.js` (respeta las comas).
- **Cambiar el ícono de la marca:** [`src/components/Logo.jsx`](src/components/Logo.jsx).

---

### ✅ Si algo se rompe
Casi siempre es una **coma o comilla** de más o de menos. El navegador muestra el
error con el archivo y la línea. Deshaz tu último cambio (Ctrl+Z) y prueba de nuevo.
