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
| Tiendas asociadas (nombre, categoría, beneficio) | `comercios` |
| Sección "Compra en tus tiendas favoritas" (títulos, filtros) | `dashboard.tiendas…` |
| Accesos rápidos (los 4 botones y a dónde llevan) | `dashboard.acciones` |
| Tus compras (Liverpool, etc.) | `dashboard.planes` |
| Movimientos (Compras / Pagos) | `dashboard.movimientos` |

**Reglas simples al editar texto:**
- El texto va entre comillas: `'cámbiame'`.
- Salto de línea en un título: usa `\n` → `'Hola\nmundo'`.
- Para íconos, escribe el **nombre**: `bolt`, `shield`, `gift`, `cart`, `scan`,
  `wallet`, `chart`, `spark`, `calendar`, `bell`.
- No borres las comas `,` ni los corchetes `[ ]` `{ }`; solo cambia lo de adentro.

---

## 🪪 Cambiar el LOGO de la marca (Quincena)

👉 Copia tus archivos en **[`src/assets/brand/`](src/assets/brand/)** y en
`content.js → brand` escribe el nombre del archivo en `simbolo`, `logo` o `logoTarjeta`.
Vacío = símbolo original. Detalle de cada campo en
[`src/assets/brand/README.md`](src/assets/brand/README.md).

---

## 🏬 Agregar o cambiar LOGOS de tiendas

👉 Copia el PNG (fondo transparente) en **[`src/assets/logos/`](src/assets/logos/)**.
Se carga solo: el nombre del archivo debe coincidir con el `id` del comercio en
`content.js → comercios` (ej. `nike` → `nike.png`). Lista completa y reglas en
[`src/assets/logos/README.md`](src/assets/logos/README.md).

- Para que una compra, el próximo pago o un movimiento muestre un logo, pon
  `comercio: '<id>'` en ese bloque de `content.js`.
- Para agregar una tienda nueva: copia un bloque `{ id: ..., nombre: ... }` en `comercios`.
- Para usar otra versión de un logo sin renombrar: agrega `logo: 'archivo.png'` al comercio.
- Sin PNG todavía → se ve un monograma o el nombre en gris (nada se rompe).

---

## 🎨 Cambiar COLORES y tipografía

👉 **[`src/styles.css`](src/styles.css)**, bloque `:root` al inicio (todo comentado en español).

- Cambia un color (ej. `--violet: #7c6cff;`) y **toda** la app se re-colorea sola.
- `--violet` = color principal · `--lime` = color de acento · `--bg-1` = fondo del teléfono.
- **Espaciado:** `--space-1` … `--space-8` (4px a 40px). Toda la separación entre
  textos, botones y tarjetas usa esa escala: súbela o bájala y todo respira parejo.

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
| Próximo pago | `.pay-card` |
| Tus compras | `.purchase` |
| Tarjetas de tiendas | `.merchant` |
| Logos (tamaños) | `.mlogo` |
| Movimientos | `.tx` |
| Móvil / responsive | `RESPONSIVE` |
| Barra inferior | `.tabbar` |

---

## 🖥️ Entender las PANTALLAS (si quieres codear)

Cada pantalla es un archivo en [`src/screens/`](src/screens/) y arriba tiene un
comentario que dice qué editar:

- [`Welcome.jsx`](src/screens/Welcome.jsx) — bienvenida
- [`PhoneStep.jsx`](src/screens/PhoneStep.jsx) — teléfono
- [`OtpStep.jsx`](src/screens/OtpStep.jsx) — código + animación de verificación
- [`Dashboard.jsx`](src/screens/Dashboard.jsx) — panel (arma las piezas de `src/components/`:
  `CreditCard`, `QuickAction`, `PaymentCard`, `PurchaseCard`, `MerchantCard`,
  `MerchantLogo`, `MovementItem`, `SectionHeader`)

El orden del flujo (qué pantalla sigue a cuál) está en [`src/App.jsx`](src/App.jsx).

---

## ⏱️ Cosas puntuales

- **Velocidad de la animación "Verificando → ✓":** en [`OtpStep.jsx`](src/screens/OtpStep.jsx),
  función `verify()` (los números en milisegundos).
- **Agregar/quitar un beneficio, acción, plan o movimiento:** copia un bloque
  `{ ... }` dentro de su lista en `content.js` (respeta las comas).
- **Cambiar el ícono de la marca:** sin código, con `brand.simbolo` (ver arriba). El símbolo
  de respaldo dibujado en código está en [`src/components/Logo.jsx`](src/components/Logo.jsx).

---

### ✅ Si algo se rompe
Casi siempre es una **coma o comilla** de más o de menos. El navegador muestra el
error con el archivo y la línea. Deshaz tu último cambio (Ctrl+Z) y prueba de nuevo.
