# Logos de la marca (Quincena)

Copia aquí los archivos de tu marca (`.png`, `.svg`, `.webp` o `.jpg`) y elige
cuál usar en **`src/content.js` → `brand`**, escribiendo solo el nombre del archivo.
Puedes tener varias versiones en esta carpeta y cambiar entre ellas sin tocar código.

| Campo en `brand` | Dónde aparece | Recomendación |
|---|---|---|
| `simbolo` | Ícono de la app (arriba), ícono grande de la bienvenida, tarjeta de crédito y movimientos de cashback | Cuadrado, se pinta **sobre fondo oscuro** (versión clara o a color) |
| `logo` | Reemplaza el ícono + nombre del encabezado de la bienvenida | Horizontal, **sobre fondo claro** |
| `logoTarjeta` | Esquina superior de la tarjeta de crédito oscura | Horizontal, versión **blanca/clara** |

Ejemplo:

```js
export const brand = {
  nombre1: 'Quin',
  nombre2: 'cena',
  simbolo: 'simbolo-blanco.png',
  logo: 'quincena-horizontal.svg',
  logoTarjeta: 'quincena-blanco.svg',
}
```

- Vacío (`''`) = se usa el símbolo original dibujado en código. Nada se rompe.
- Mayúsculas y extensión no importan: `'simbolo'`, `'Simbolo.PNG'` y `'simbolo.png'` encuentran el mismo archivo.
- Para cambiar el **nombre** de la marca (cabecera, barra de estado, pie de página) edita `nombre1` y `nombre2`.

Los logos de **tiendas** van en otra carpeta: [`../logos/`](../logos/README.md).
