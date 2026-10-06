// ============================================================================
//  CONTENIDO EDITABLE  —  cambia aquí TODOS los textos y datos de la demo
// ============================================================================
//
//  👉 Esta es la zona segura para editar. Cambia textos, montos, nombres,
//     comercios, etc. SIN tocar el código de las pantallas.
//
//  - El texto va entre comillas: 'así'.  Puedes usar acentos y emojis. 🎉
//  - Para un salto de línea dentro de un título usa \n  (ej: 'Hola\nmundo').
//  - Los "icon" son NOMBRES de ícono. Íconos disponibles (en src/components/Icons.jsx):
//      bolt, shield, gift, cart, scan, wallet, chart, spark, calendar, bell
//  - Los "comercio" son el id de una tienda de la lista `comercios` (más abajo).
//    Su logo sale de  src/assets/logos/<id>.png  (ver src/assets/logos/README.md).
//  - NO borres las comas ni los corchetes [ ]  { }  — solo cambia lo de adentro.
//
//  Después de guardar, la página se actualiza sola (no hay que reiniciar nada).
// ============================================================================

// ---- Marca -----------------------------------------------------------------
export const brand = {
  // El nombre se parte en dos para pintar la segunda mitad en color lima.
  // "Quin" + "cena"  ->  Quincena
  nombre1: 'Quin',
  nombre2: 'cena',
}

// ---- Pantalla 1: Bienvenida ------------------------------------------------
export const welcome = {
  chipArriba: '+$6,000 disponible',
  chipAbajo: '0% interés',
  titulo: 'Compra hoy,\npaga en quincenas',
  descripcion: 'La forma más simple de dividir tus compras en 4 pagos, sin tarjeta de crédito.',

  // Lista de beneficios (puedes agregar o quitar bloques { ... })
  beneficios: [
    { icon: 'bolt',   titulo: 'Aprobación en segundos',          sub: 'Sin papeleo ni filas' },
    { icon: 'shield', titulo: 'Sin tarjeta, sin intereses ocultos', sub: 'Todo claro desde el inicio' },
    { icon: 'gift',   titulo: 'Divide en 4 quincenas',           sub: 'Compra hoy, paga a tu ritmo' },
  ],

  // Prueba social (debajo, antes del botón)
  usuarios: '+120 mil',
  usuariosSub: 'usuarios',
  rating: '4.9',
  ratingSub: 'en tiendas',

  // Tira animada de logos (sale de la lista `comercios`)
  tiendasTitulo: 'Úsalo en tus tiendas favoritas',

  botonPrincipal: 'Comenzar',
  botonSecundario: '¿Ya tienes cuenta? ', // la palabra "Inicia sesión" se agrega en color aparte
  botonSecundarioResalte: 'Inicia sesión',
}

// ---- Pantalla 2: Número de teléfono ----------------------------------------
export const phone = {
  paso: 'Paso 1 de 3',
  titulo: '¿Cuál es tu\nnúmero?',
  descripcion: 'Lo usamos para crear tu cuenta y mantenerla segura. Te enviaremos un código para confirmarlo.',
  etiquetaCampo: 'Número de celular',
  bandera: '🇲🇽',
  lada: '+52',
  placeholder: '55 1234 5678',
  seguridadTitulo: 'Tus datos están protegidos',
  seguridadSub: 'Cifrado de extremo a extremo · nunca compartimos tu número',
  botonPrincipal: 'Enviar código',
  botonRegresar: '← Regresar',
}

// ---- Pantalla 3: Verificación (código OTP, decorativo) ---------------------
export const otp = {
  paso: 'Paso 2 de 3',
  titulo: 'Verifica tu\nnúmero',
  // {telefono} se reemplaza por el número que escribió la persona
  descripcion: 'Escribe el código de 6 dígitos que enviamos al {telefono}.',
  reenviar: 'Reenviar código en ',
  reenviarTiempo: '0:28',
  // Aviso de que es demo (importante mantenerlo para dejar claro que no es real)
  demoEtiqueta: 'Demo:',
  demoTexto: 'este campo es decorativo. No se envía ni se valida ningún código real. Toca ',
  demoResalte: '“rellenar ejemplo”',
  demoTextoFin: ' para continuar.',
  botonRellenar: 'Rellenar ejemplo (demo)',
  botonVerificar: 'Verificar',
  botonCambiar: '← Cambiar número',

  // Animación al verificar
  verificandoTitulo: 'Verificando…',
  verificandoSub: 'Estamos confirmando tu identidad de forma segura. Esto suele tardar unos segundos.',
  exitoTitulo: '¡Identidad verificada!',
  exitoSub: 'Tu cuenta Quincena está lista. Preparando tu panel…',
}

// ---- Comercios (tiendas asociadas) ----------------------------------------
//  id          -> nombre del archivo del logo en src/assets/logos/ (ej. 'nike' -> nike.png)
//  alias       -> otros nombres de archivo aceptados para ese logo (opcional)
//  categoria   -> se usa para los filtros de "Tiendas" en el dashboard
//  beneficio   -> texto corto bajo el logo en la tarjeta de la tienda
//  color/tinta -> SOLO para el monograma de respaldo mientras no exista el PNG
//  catalogo    -> false = no aparece en "Tiendas" (pero sí en compras/movimientos)
export const comercios = [
  { id: 'nike',                 nombre: 'Nike',                 categoria: 'Deportes',        beneficio: 'Hasta 4 quincenas',          color: '#111111' },
  { id: 'mercado-libre',        nombre: 'Mercado Libre',        categoria: 'Marketplace',     beneficio: '0% de interés',              color: '#ffe600', tinta: '#2d3277', alias: ['meli'] },
  { id: 'amazon',               nombre: 'Amazon',               categoria: 'Marketplace',     beneficio: 'Paga en quincenas',         color: '#232f3e' },
  { id: 'cinepolis',            nombre: 'Cinépolis',            categoria: 'Entretenimiento', beneficio: 'Boletos y dulcería',         color: '#0b2d72' },
  { id: 'super-boletos',        nombre: 'Super Boletos',        categoria: 'Entretenimiento', beneficio: 'Conciertos a plazos',       color: '#1d4ed8' },
  { id: 'promoda',              nombre: 'Promoda',              categoria: 'Moda',            beneficio: 'Paga en 4 quincenas',        color: '#e4007c' },
  { id: 'cuidado-con-el-perro', nombre: 'Cuidado con el Perro', categoria: 'Moda',            beneficio: 'Estrena sin esperar',        color: '#1a1a1a', alias: ['ccp'] },
  { id: 'taf',                  nombre: 'TAF',                  categoria: 'Deportes',        beneficio: 'Sneakers a plazos',          color: '#111111' },
  { id: 'dicass',               nombre: 'DICASS',               categoria: 'Belleza',         beneficio: 'Perfumes a plazos',          color: '#1a1a1a' },
  { id: 'casa-ley',             nombre: 'Casa Ley',             categoria: 'Súper',           beneficio: 'Tu despensa a plazos',      color: '#c8102e', alias: ['ley'] },
  // Liverpool ya existía en tus compras: se conserva (monograma hasta que agregues liverpool.png).
  { id: 'liverpool',            nombre: 'Liverpool',            categoria: 'Departamental',   beneficio: 'Hasta 4 quincenas',          color: '#e0457b', catalogo: false },
  // Asset registrado (aplazo.png) pero fuera del catálogo: es otra marca BNPL, no una tienda.
  { id: 'aplazo',               nombre: 'Aplazo',               categoria: 'BNPL',            beneficio: '',                           color: '#68d7e8', catalogo: false },
]

// ---- Pantalla 4: Dashboard -------------------------------------------------
export const dashboard = {
  saludo: 'Buenas tardes,',
  nombre: 'Hola 👋',
  inicialAvatar: 'Q',
  racha: 'Racha de 6 pagos a tiempo',

  // Tarjeta de crédito
  tarjeta: {
    marca: 'quincena',
    etiqueta: 'Crédito disponible',
    monto: '$6,255',
    sub: 'de $8,000 · límite total',
    usado: 'Usado $1,745',
    libre: '78% libre',
    porcentajeUsado: 78,          // 0 a 100 (llena la barra)
    numero: ['5412', '••••', '••••', '8842'],
    titularEtiqueta: 'Titular',
    titular: 'Tu Nombre',
    desdeEtiqueta: 'Miembro desde',
    desde: '10/26',
    botonDetalle: 'Ver detalle',
    botonOcultar: 'Ocultar detalle',
  },

  // Tarjeta de "insight" (consejo)
  insight: 'Este mes gastas 18% menos que el anterior. ¡Vas por buen camino! 🎯',

  // Próximo pago
  proximoPago: {
    titulo: 'Próximo pago',
    comercio: 'liverpool',         // id de `comercios` (pinta su logo)
    monto: '$625',
    dia: '15',
    mes: 'OCT',
    sub: 'Pago 4 de 4 · vence el 15 de octubre',
    botonSecundario: 'Ver pagos',  // lleva a Movimientos › Pagos
    boton: 'Pagar',
  },

  // Accesos rápidos (4 cuadros)
  accionesTitulo: 'Acciones rápidas',
  // corto   -> etiqueta bajo el ícono
  // destino -> sección a la que lleva al tocarla: 'compras' | 'tiendas' | 'pagos' | 'tarjeta'
  acciones: [
    { icon: 'scan',   color: 'dark',  corto: 'Escanear', titulo: 'Escanear QR',      sub: 'Paga en tienda', destino: 'tiendas' },
    { icon: 'cart',   color: 'lime',  corto: 'Comprar',  titulo: 'Comprar en línea', sub: 'Genera tu link', destino: 'tiendas' },
    { icon: 'wallet', color: '',      corto: 'Pagos',    titulo: 'Mis pagos',        sub: '3 por vencer',   destino: 'pagos', badge: 3 },
    { icon: 'spark',  color: 'coral', corto: 'Límite',   titulo: 'Sube tu límite',   sub: 'Hasta $12,000',  destino: 'tarjeta' },
  ],

  // Planes activos (compras a plazos en curso)
  planesTitulo: 'Tus compras',
  planesVerTodos: 'Ver todos',
  // comercio -> id de `comercios` (logo). color/inicial = respaldo si no hay logo.
  planes: [
    { comercio: 'liverpool',     nombre: 'Liverpool',     color: '#e0457b', inicial: 'L', pagados: 3, total: 4, proximo: '$625', fecha: '15 oct' },
    { comercio: 'mercado-libre', nombre: 'Mercado Libre', color: '#ffe600', tinta: '#3a3100', inicial: 'M', pagados: 1, total: 4, proximo: '$340', fecha: '22 oct' },
    { comercio: 'nike',          nombre: 'Nike Store',    color: '#111',    inicial: 'N', pagados: 2, total: 4, proximo: '$780', fecha: '28 oct' },
  ],

  // Tiendas asociadas (la lista sale de `comercios`, arriba)
  tiendasTitulo: 'Compra en tus tiendas favoritas',
  tiendasSub: 'Paga en 4 quincenas, sin tarjeta.',
  tiendasFiltroTodas: 'Todas',
  tiendasVerTodas: 'Ver todas',
  tiendasVerMenos: 'Ver menos',
  tiendasIniciales: 6,           // cuántas se ven antes de "Ver todas"

  // Movimientos (con las dos pestañas)
  // comercio -> id de `comercios` (logo); 'quincena' = marca propia. emoji = solo si no hay comercio.
  // tipo     -> 'pago' (palomita) | 'cashback' (regalo) | sin tipo = compra
  movimientosTitulo: 'Movimientos',
  movimientos: {
    Compras: [
      { comercio: 'liverpool',     emoji: '🛍️', titulo: 'Liverpool',     sub: 'Hoy · 14:32',    monto: '-$2,500', entrada: false },
      { comercio: 'nike',          emoji: '👟', titulo: 'Nike Store',    sub: 'Ayer · 19:05',   monto: '-$3,120', entrada: false },
      { comercio: 'mercado-libre', emoji: '📦', titulo: 'Mercado Libre', sub: '28 sep · 11:20', monto: '-$1,360', entrada: false },
    ],
    Pagos: [
      { comercio: 'liverpool', tipo: 'pago',     emoji: '✅', titulo: 'Pago quincena',     sub: 'Liverpool · Hoy 09:00', monto: '-$625', entrada: false },
      { comercio: 'quincena',  tipo: 'cashback', emoji: '🎁', titulo: 'Cashback Quincena', sub: '30 sep',      monto: '+$48',  entrada: true },
      { comercio: 'nike',      tipo: 'pago',     emoji: '✅', titulo: 'Pago quincena',     sub: 'Nike Store · 15 sep',      monto: '-$780', entrada: false },
    ],
  },

  botonReiniciar: '↺ Reiniciar demo',
}
