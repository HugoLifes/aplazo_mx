// ============================================================================
//  CONTENIDO EDITABLE  —  cambia aquí TODOS los textos y datos de la app
// ============================================================================
//
//  👉 Esta es la zona segura para editar. Cambia textos, montos, nombres,
//     comercios, etc. SIN tocar el código de las pantallas.
//
//  - El texto va entre comillas: 'así'.  Puedes usar acentos y emojis. 🎉
//  - Para un salto de línea dentro de un título usa \n  (ej: 'Hola\nmundo').
//  - Los "icon" son NOMBRES de ícono. Íconos disponibles (en src/components/Icons.jsx):
//      bolt, shield, gift, cart, scan, wallet, chart, spark, calendar, bell, card, help
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

  // Logos de la marca (opcionales). Copia tus archivos en  src/assets/brand/
  // y escribe aquí el NOMBRE del archivo (con o sin extensión).
  // Vacío ('') = se usa el símbolo original dibujado en código.
  // Puedes tener varias versiones en la carpeta y cambiar entre ellas solo editando aquí.
  simbolo: '',          // ícono cuadrado (va sobre fondo oscuro): app, tarjeta, cashback. Ej. 'simbolo.png'
  logo: '',             // logo completo horizontal (sobre fondo claro): reemplaza ícono + nombre arriba. Ej. 'logo.svg'
  logoTarjeta: '',      // versión clara del logo para la tarjeta oscura (si falta, usa símbolo + nombre)
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

  botonPrincipal: 'Crear cuenta',
  botonSecundario: '¿Ya tienes cuenta? ', // la palabra "Inicia sesión" se agrega en color aparte
  botonSecundarioResalte: 'Inicia sesión',
}

// ---- Pantalla 2: Número de teléfono ----------------------------------------
export const phone = {
  paso: 'Paso 1 de 3',
  titulo: '¿Cuál es tu\nnúmero?',
  descripcion: 'Lo usamos para crear tu cuenta y mantenerla segura. Te enviaremos un código por SMS.',
  etiquetaCampo: 'Número de celular',
  bandera: '🇲🇽',
  lada: '+52',
  placeholder: '55 1234 5678',
  digitos: 10,                       // largo del número (México = 10)
  ayudaFaltan: 'Faltan {n} dígitos',
  ayudaListo: 'Número válido',
  seguridadTitulo: 'Tus datos están protegidos',
  seguridadSub: 'Cifrado de extremo a extremo · nunca compartimos tu número',
  terminos: 'Al continuar aceptas los Términos y el Aviso de privacidad.',
  botonPrincipal: 'Enviar código',
  botonRegresar: '← Regresar',
}

// ---- Pantalla 3: Verificación (código por SMS, simulado) -------------------
export const otp = {
  paso: 'Paso 2 de 3',
  titulo: 'Verifica tu\nnúmero',
  // {telefono} se reemplaza por el número que escribió la persona
  descripcion: 'Escribe el código de 6 dígitos que enviamos al {telefono}.',
  reenviarEn: 'Reenviar código en ',
  reenviar: 'Reenviar código',
  segundosReenvio: 30,
  // Notificación de SMS que aparece arriba (tócala para rellenar el código)
  smsApp: 'Mensajes',
  smsAhora: 'ahora',
  smsTexto: 'Quincena: tu código de verificación es {codigo}. No lo compartas con nadie.',
  smsAccion: 'Toca para rellenar',
  smsSegundos: 2.5,                  // cuánto tarda en "llegar" el SMS
  error: 'El código no coincide. Revisa el SMS e inténtalo de nuevo.',
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
//  logo        -> (opcional) archivo concreto a usar, para cambiar de versión sin renombrar:
//                 ej. logo: 'nike-blanco.png'. Si falta, se busca <id>.png
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
//  Los montos van como NÚMEROS (sin $ ni comas): la app los formatea y los
//  actualiza sola cuando pagas o compras.  Las fechas son RELATIVAS a hoy
//  (enDias / haceDias) para que nunca se vean viejas.
export const usuario = {
  nombre: 'Daniela',
  apellido: 'Ruiz',
  nivel: 'Nivel Plata',
}

export const dashboard = {
  // El saludo cambia solo según la hora
  saludos: { manana: 'Buenos días', tarde: 'Buenas tardes', noche: 'Buenas noches' },
  racha: 'Racha de {n} pagos a tiempo',
  rachaInicial: 6,

  // Tarjeta de crédito
  tarjeta: {
    marca: 'quincena',
    etiqueta: 'Crédito disponible',
    disponible: 6255,
    limite: 8000,
    subLimite: 'de {limite} · límite total',
    usado: 'Usado {usado}',
    libre: '{pct}% libre',
    numero: ['5412', '••••', '••••', '8842'],
    titularEtiqueta: 'Titular',
    desdeEtiqueta: 'Miembro desde',
    desde: '10/26',
    botonDetalle: 'Ver detalle',
    botonOcultar: 'Ocultar detalle',
  },

  // Tarjeta de "insight" (consejo)
  insight: 'Este mes gastas 18% menos que el anterior. ¡Vas por buen camino! 🎯',

  // Próximo pago (se calcula solo: la compra con el pago más cercano)
  proximoPago: {
    titulo: 'Próximo pago',
    sub: 'Pago {n} de {total} · vence {fecha}',
    botonSecundario: 'Ver pagos',
    boton: 'Pagar',
    alDia: '¡Estás al día!',
    alDiaSub: 'No tienes pagos pendientes.',
  },

  // Accesos rápidos
  accionesTitulo: 'Acciones rápidas',
  // accion -> qué abre: 'escanear' | 'tiendas' | 'pagos' | 'limite'
  // en sub, {n} = número de pagos pendientes
  acciones: [
    { icon: 'scan',   color: 'dark',  corto: 'Escanear', titulo: 'Escanear QR',      sub: 'Paga en tienda', accion: 'escanear' },
    { icon: 'cart',   color: 'lime',  corto: 'Comprar',  titulo: 'Comprar en línea', sub: 'Genera tu link', accion: 'tiendas' },
    { icon: 'wallet', color: '',      corto: 'Pagos',    titulo: 'Mis pagos',        sub: '{n} por vencer', accion: 'pagos', badge: true },
    { icon: 'spark',  color: 'coral', corto: 'Límite',   titulo: 'Sube tu límite',   sub: 'Hasta $12,000',  accion: 'limite' },
  ],

  // Compras a plazos en curso
  planesTitulo: 'Tus compras',
  planesVerTodos: 'Ver todos',
  planLiquidado: 'Liquidado',
  // comercio -> id de `comercios` (logo) · monto = cada pago · enDias = días para el próximo pago
  planes: [
    { comercio: 'liverpool',     nombre: 'Liverpool',     color: '#e0457b', inicial: 'L', pagados: 3, total: 4, monto: 625, enDias: 9 },
    { comercio: 'mercado-libre', nombre: 'Mercado Libre', color: '#ffe600', tinta: '#3a3100', inicial: 'M', pagados: 1, total: 4, monto: 340, enDias: 16 },
    { comercio: 'nike',          nombre: 'Nike Store',    color: '#111',    inicial: 'N', pagados: 2, total: 4, monto: 780, enDias: 22 },
  ],

  // Tiendas asociadas (la lista sale de `comercios`, arriba)
  tiendasTitulo: 'Compra en tus tiendas favoritas',
  tiendasSub: 'Paga en 4 quincenas, sin tarjeta.',
  tiendasFiltroTodas: 'Todas',
  tiendasVerTodas: 'Ver todas',
  tiendasVerMenos: 'Ver menos',
  tiendasIniciales: 6,

  // Movimientos (con las dos pestañas)
  // comercio -> id de `comercios` (logo); 'quincena' = marca propia
  // tipo     -> 'pago' (palomita) | 'cashback' (regalo) | sin tipo = compra
  // haceDias -> 0 = hoy, 1 = ayer, etc.
  movimientosTitulo: 'Movimientos',
  movimientosVacio: 'Aún no hay movimientos aquí.',
  movimientos: {
    Compras: [
      { comercio: 'liverpool',     titulo: 'Liverpool',     haceDias: 0, hora: '14:32', monto: -2500 },
      { comercio: 'nike',          titulo: 'Nike Store',    haceDias: 1, hora: '19:05', monto: -3120 },
      { comercio: 'mercado-libre', titulo: 'Mercado Libre', haceDias: 8, hora: '11:20', monto: -1360 },
    ],
    Pagos: [
      { comercio: 'liverpool', tipo: 'pago',     titulo: 'Pago quincena',     detalle: 'Liverpool',  haceDias: 0,  hora: '09:00', monto: -625 },
      { comercio: 'quincena',  tipo: 'cashback', titulo: 'Cashback Quincena', detalle: '',           haceDias: 6,  hora: '10:15', monto: 48 },
      { comercio: 'nike',      tipo: 'pago',     titulo: 'Pago quincena',     detalle: 'Nike Store', haceDias: 21, hora: '08:40', monto: -780 },
    ],
  },
}

// ---- Hojas (ventanas que suben desde abajo) ---------------------------------
export const hojas = {
  // Pagar una quincena
  pagar: {
    titulo: 'Pagar quincena',
    metodoTitulo: 'Método de pago',
    metodos: [
      { id: 'debito', icon: 'card',   titulo: 'Tarjeta de débito',  sub: 'Débito •••• 4021' },
      { id: 'spei',   icon: 'bolt',   titulo: 'Transferencia SPEI', sub: 'Se refleja al instante' },
      { id: 'tienda', icon: 'wallet', titulo: 'Efectivo en tienda', sub: 'Con referencia de pago' },
    ],
    boton: 'Pagar {monto}',
    procesando: 'Procesando pago…',
    exito: '¡Pago realizado!',
    exitoSub: 'Tu crédito disponible ya se actualizó.',
    folio: 'Folio',
    listo: 'Listo',
  },

  // Detalle de una compra a plazos
  plan: {
    total: 'Total de la compra',
    calendario: 'Calendario de pagos',
    pagado: 'Pagado',
    proximo: 'Próximo',
    pendiente: 'Pendiente',
    adelantar: 'Adelantar pago de {monto}',
    liquidado: 'Compra liquidada 🎉',
  },

  // Tienda: simulador de pagos + código de compra
  tienda: {
    simulador: '¿Cuánto vas a comprar?',
    pagos: '4 pagos de',
    sinInteres: '0% de interés · sin comisiones',
    calendario: 'Así pagarías',
    hoy: 'Hoy',
    boton: 'Generar código de compra',
    codigoTitulo: 'Tu código de compra',
    codigoSub: 'Muéstralo en caja o pégalo en el checkout de {tienda}.',
    vence: 'Vence en',
    copiar: 'Copiar código',
    copiado: '¡Copiado!',
  },

  // Escanear QR en tienda
  escanear: {
    titulo: 'Escanear para pagar',
    apunta: 'Apunta al código QR de la caja',
    buscando: 'Buscando código…',
    detectado: 'Código detectado',
    comercio: 'cinepolis',           // tienda que "detecta" el escáner
    monto: 480,
    concepto: 'Combo pareja + 2 boletos',
    boton: 'Pagar en 4 quincenas',
    procesando: 'Aprobando tu compra…',
    exito: '¡Compra aprobada!',
    exitoSub: 'Pagarás 4 quincenas de {pago}. El primer pago es en 14 días.',
    listo: 'Listo',
    sinCredito: 'No tienes crédito suficiente para esta compra.',
  },

  // Subir límite
  limite: {
    titulo: 'Sube tu límite',
    sub: 'Cumple estos pasos y podrás llegar hasta',
    objetivo: 12000,
    pasos: [
      { titulo: 'Paga a tiempo',           sub: '{racha} de 8 pagos puntuales', progreso: true },
      { titulo: 'Verifica tu identidad',   sub: 'INE validada',                 hecho: true },
      { titulo: 'Agrega tu correo',        sub: 'Para enviarte tus estados de cuenta', hecho: false },
    ],
    boton: 'Solicitar revisión',
    enviado: 'Solicitud enviada',
    enviadoSub: 'Te avisaremos en menos de 24 horas.',
  },

  // Notificaciones (campana)
  notificaciones: {
    titulo: 'Notificaciones',
    marcarLeidas: 'Marcar como leídas',
    vacio: 'Estás al día. No hay notificaciones nuevas.',
    lista: [
      { icon: 'calendar', titulo: 'Tu próximo pago se acerca', sub: 'Liverpool · vence en 9 días', hace: 'Hace 2 h' },
      { icon: 'gift',     titulo: 'Ganaste $48 de cashback',  sub: 'Por pagar a tiempo 6 quincenas seguidas', hace: 'Ayer' },
      { icon: 'cart',     titulo: 'Nuevo en Quincena',        sub: 'Cinépolis ya acepta pagos en quincenas', hace: 'Hace 3 días' },
    ],
  },

  // Perfil
  perfil: {
    telefono: 'Teléfono',
    opciones: [
      { icon: 'card',   titulo: 'Métodos de pago',     sub: 'Débito •••• 4021' },
      { icon: 'shield', titulo: 'Seguridad',           sub: 'Face ID activado' },
      { icon: 'bell',   titulo: 'Notificaciones',      sub: 'Recordatorios de pago' },
      { icon: 'help',   titulo: 'Ayuda',               sub: 'Chat 24/7' },
    ],
    cerrarSesion: 'Cerrar sesión',
  },
}
