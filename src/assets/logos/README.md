# Logos de comercios

PNG con fondo transparente, tomados de `logos_aplazo_TRANSPARENTES.zip` (renombrados
sin el prefijo numérico: `01_cinepolis.png` → `cinepolis.png`). Se cargan **automáticamente** (no hay
que importar nada): el nombre del archivo se compara con el `id` de cada comercio
en `src/content.js` → `comercios`.

| Comercio | Archivo esperado |
|---|---|
| Cinépolis | `cinepolis.png` |
| Super Boletos | `super-boletos.png` |
| Amazon | `amazon.png` |
| Mercado Libre | `mercado-libre.png` |
| Promoda | `promoda.png` |
| Cuidado con el Perro | `cuidado-con-el-perro.png` |
| Casa Ley | `casa-ley.png` |
| DICASS | `dicass.png` |
| Nike | `nike.png` |
| TAF | `taf.png` |
| Liverpool | `liverpool.png` (no incluido en el ZIP; mientras falte se ve su monograma) |
| Aplazo | `aplazo.png` (registrado como asset; no se muestra en la UI porque es otra marca BNPL) |

El nombre es tolerante: mayúsculas, acentos, espacios, guiones y guiones bajos se
ignoran. `Mercado Libre.png`, `mercado_libre.png` y `MercadoLibre.png` funcionan igual.
También se aceptan `.webp` y `.svg`.

Para agregar un logo nuevo: copia el PNG aquí con el `id` del comercio como nombre.

**Cambiar a otra versión de un logo** (ej. uno en blanco o actualizado) sin renombrar
archivos: copia el nuevo PNG aquí y en `content.js → comercios` agrega `logo` a ese
comercio:

```js
{ id: 'nike', logo: 'nike-2026.png', nombre: 'Nike', ... }
```

El logo de la marca propia (Quincena) se cambia aparte: ver [`../brand/`](../brand/README.md).
Mientras falte un archivo, la app muestra un monograma neutro en su lugar.
Los logos nunca se estiran: se pintan con `object-fit: contain` dentro de una caja
de tamaño fijo, así que da igual si son horizontales o cuadrados. Recórtalos sin
márgenes transparentes de sobra para que se vean del mismo tamaño visual.
