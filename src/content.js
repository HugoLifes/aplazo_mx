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
  },

  // Tarjeta de "insight" (consejo)
  insight: 'Este mes gastas 18% menos que el anterior. ¡Vas por buen camino! 🎯',

  // Próximo pago
  proximoPago: {
    titulo: 'Próximo pago · $625',
    sub: 'Liverpool · vence el 15 de octubre',
    boton: 'Pagar',
  },

  // Accesos rápidos (4 cuadros)
  accionesTitulo: 'Acciones rápidas',
  acciones: [
    { icon: 'scan',   color: '',      titulo: 'Escanear QR',      sub: 'Paga en tienda' },
    { icon: 'cart',   color: 'lime',  titulo: 'Comprar en línea', sub: 'Genera tu link' },
    { icon: 'wallet', color: 'coral', titulo: 'Mis pagos',        sub: '3 por vencer' },
    { icon: 'spark',  color: '',      titulo: 'Sube tu límite',   sub: 'Hasta $12,000' },
  ],

  // Planes activos (compras a plazos en curso)
  planesTitulo: 'Planes activos',
  planesVerTodos: 'Ver todos',
  planes: [
    { nombre: 'Liverpool',     color: '#e0457b', inicial: 'L', pagados: 3, total: 4, proximo: '$625', fecha: '15 oct' },
    { nombre: 'Mercado Libre', color: '#ffe600', tinta: '#3a3100', inicial: 'M', pagados: 1, total: 4, proximo: '$340', fecha: '22 oct' },
    { nombre: 'Nike Store',    color: '#111',    inicial: 'N', pagados: 2, total: 4, proximo: '$780', fecha: '28 oct' },
  ],

  // Movimientos (con las dos pestañas)
  movimientosTitulo: 'Movimientos',
  movimientos: {
    Compras: [
      { emoji: '🛍️', titulo: 'Liverpool',     sub: 'Hoy · 14:32',    monto: '-$2,500', entrada: false },
      { emoji: '👟', titulo: 'Nike Store',    sub: 'Ayer · 19:05',   monto: '-$3,120', entrada: false },
      { emoji: '📦', titulo: 'Mercado Libre', sub: '28 sep · 11:20', monto: '-$1,360', entrada: false },
    ],
    Pagos: [
      { emoji: '✅', titulo: 'Pago quincena',       sub: 'Hoy · 09:00', monto: '-$625', entrada: false },
      { emoji: '🎁', titulo: 'Cashback Quincena',   sub: '30 sep',      monto: '+$48',  entrada: true },
      { emoji: '✅', titulo: 'Pago quincena',       sub: '15 sep',      monto: '-$780', entrada: false },
    ],
  },

  botonReiniciar: '↺ Reiniciar demo',
}
