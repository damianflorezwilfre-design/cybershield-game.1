export type LevelType = 'phishing' | 'password' | 'quiz';

export interface LevelData {
  id: number;
  title: string;
  type: LevelType;
  description: string;
  xpReward: number;
  content: any;
}

export const LEVELS: LevelData[] = [
  {
    id: 1,
    title: "Operación: Anzuelo Digital",
    type: "phishing",
    description: "Identifica ataques de Phishing y protege la red de la Alcaldía.",
    xpReward: 100,
    content: {
      emails: [
        {
          id: 1,
          sender: "soporte@paypaI.com",
          subject: "Aviso Urgente: Cuenta Suspendida",
          content: "Su cuenta institucional ha sido bloqueada temporalmente por actividad sospechosa. Haga clic en el botón de abajo para verificar su identidad.",
          link: "http://www.paypal-verification-secure.com",
          isPhishing: true,
          explanation: "El dominio del remitente usa una 'I' mayúscula en lugar de 'l' (paypaI.com) y el enlace lleva a un sitio web falso. ¡Clásico ataque de Phishing homógrafo!"
        },
        {
          id: 2,
          sender: "recursos_humanos@alcaldia.gov.co",
          subject: "Actualización de Política de Vacaciones",
          content: "Estimado funcionario, adjunto encontrará la nueva normativa de vacaciones para este año.",
          link: "https://intranet.alcaldia.gov.co/politicas/vacaciones.pdf",
          isPhishing: false,
          explanation: "El correo proviene del dominio oficial del gobierno y el enlace apunta a la intranet segura mediante HTTPS."
        }
      ]
    }
  },
  {
    id: 2,
    title: "Código Enigma: Acceso al Despacho",
    type: "password",
    description: "Crea una contraseña segura para el sistema central del Despacho del Alcalde.",
    xpReward: 200,
    content: {
      context: "El sistema de planeación urbana está bajo un ataque de fuerza bruta. Configura una nueva clave impenetrable."
    }
  },
  {
    id: 3,
    title: "Incidente en Tesorería",
    type: "phishing",
    description: "Analiza correos dirigidos a la Secretaría de Hacienda.",
    xpReward: 150,
    content: {
      emails: [
        {
          id: 1,
          sender: "director@hacienda-alcaldia-soporte.com",
          subject: "URGENTE: Transferencia retenida",
          content: "Necesito que apruebe la transferencia de fondos de emergencia inmediatamente. Ingrese a este portal alterno.",
          link: "http://hacienda-alcaldia-soporte.com/login",
          isPhishing: true,
          explanation: "El dominio 'hacienda-alcaldia-soporte.com' es falso. Los delincuentes crean dominios similares al oficial para presionar con sentido de urgencia (Fraude del CEO)."
        },
        {
          id: 2,
          sender: "alertas@banco-nacional.com",
          subject: "Nuevo extracto disponible",
          content: "Su extracto mensual de la cuenta de nómina ya está disponible en su portal bancario.",
          link: "https://www.banco-nacional.com/extractos",
          isPhishing: false,
          explanation: "Es una notificación bancaria estándar sin enlaces sospechosos ni sentido de urgencia extremo."
        }
      ]
    }
  },
  {
    id: 4,
    title: "Normativa de Privacidad",
    type: "quiz",
    description: "Evaluación sobre la ley de protección de datos de los ciudadanos.",
    xpReward: 100,
    content: {
      question: "Un ciudadano llama exigiendo la base de datos de los beneficiarios de los subsidios de vivienda. ¿Qué debes hacer?",
      options: [
        "Enviarle el Excel de inmediato por correo electrónico.",
        "Negar la solicitud explicando que los datos personales están protegidos por la Ley de Habeas Data.",
        "Imprimir la lista y dejarla en la recepción para que la recoja."
      ],
      correctAnswer: 1,
      explanation: "Compartir datos personales de terceros sin autorización viola las leyes de protección de datos y pone en riesgo a los ciudadanos."
    }
  },
  {
    id: 5,
    title: "El USB Misterioso",
    type: "quiz",
    description: "Riesgos de seguridad física en las instalaciones.",
    xpReward: 150,
    content: {
      question: "Encuentras una memoria USB tirada en el baño de la alcaldía con la etiqueta 'Nómina_2026_Privado'. ¿Cómo procedes?",
      options: [
        "La conecto a mi computador para ver si reconozco a quién pertenece.",
        "Me la guardo para uso personal, formateándola después.",
        "La entrego directamente al departamento de TI o Seguridad de la Información sin conectarla a ningún equipo."
      ],
      correctAnswer: 2,
      explanation: "Las USBs abandonadas (Baiting) son una técnica común para infectar redes corporativas con malware o ransomware."
    }
  },
  {
    id: 6,
    title: "Ataque a Infraestructura",
    type: "password",
    description: "Refuerza los accesos a los servidores del Acueducto Municipal.",
    xpReward: 250,
    content: {
      context: "El Acueducto está reportando accesos no autorizados. Necesitamos cambiar todas las contraseñas críticas inmediatamente."
    }
  },
  {
    id: 7,
    title: "Fraude de Contratación",
    type: "phishing",
    description: "Evita estafas en el sistema de contratación pública (SECOP).",
    xpReward: 200,
    content: {
      emails: [
        {
          id: 1,
          sender: "notificaciones@secop-gov-actualizacion.org",
          subject: "Adjudicación de Contrato - Faltan Firmas",
          content: "Se requiere su firma digital urgente para liberar el presupuesto de obras públicas. Inicie sesión aquí.",
          link: "http://secop-gov-actualizacion.org/login",
          isPhishing: true,
          explanation: "Dominio falso. Los atacantes buscan robar credenciales de contratación para manipular presupuestos."
        }
      ]
    }
  },
  {
    id: 8,
    title: "Ransomware en la Red",
    type: "quiz",
    description: "Cómo actuar ante una amenaza inminente.",
    xpReward: 300,
    content: {
      question: "De repente, tu pantalla muestra una calavera roja exigiendo 5 Bitcoin para no borrar todos los archivos de la Alcaldía. ¿Cuál es tu primer paso?",
      options: [
        "Buscar en Google cómo comprar Bitcoin.",
        "Desconectar inmediatamente el computador de la red (cable de internet o Wi-Fi) y llamar a TI.",
        "Reiniciar el computador varias veces esperando que desaparezca."
      ],
      correctAnswer: 1,
      explanation: "Aislar el equipo infectado desconectándolo de la red detiene la propagación del ransomware hacia los servidores."
    }
  },
  {
    id: 9,
    title: "Ingeniería Social (Vishing)",
    type: "quiz",
    description: "Reconoce los ataques por vía telefónica.",
    xpReward: 150,
    content: {
      question: "Recibes una llamada del supuesto 'Técnico de Microsoft' diciendo que tu PC gubernamental tiene un virus y necesita instalar un programa de soporte remoto. ¿Qué haces?",
      options: [
        "Le das acceso para que arregle el problema.",
        "Le pides su nombre e instalas el programa porque confías en Microsoft.",
        "Cuelgas inmediatamente y contactas a soporte técnico interno."
      ],
      correctAnswer: 2,
      explanation: "Microsoft nunca llama proactivamente para reportar virus. Es una estafa clásica (Tech Support Scam) para ganar control remoto."
    }
  },
  {
    id: 10,
    title: "Wi-Fi Público",
    type: "quiz",
    description: "El riesgo de trabajar desde cafeterías.",
    xpReward: 100,
    content: {
      question: "Estás trabajando remoto en una cafetería y necesitas revisar un documento confidencial. ¿Qué red usas?",
      options: [
        "La red 'Cafe_Free_Wifi' porque es abierta.",
        "Usas los datos móviles de tu celular compartiendo conexión (Hotspot) o usas la VPN institucional.",
        "Te conectas a la red de un local vecino que no tiene contraseña."
      ],
      correctAnswer: 1,
      explanation: "Las redes Wi-Fi públicas pueden ser interceptadas fácilmente (Man-in-the-Middle). Usar una VPN o tus propios datos cifra la información."
    }
  },
  // Niveles del 11 al 25...
  { id: 11, title: "Clasificación de Información", type: "quiz", description: "Manejo de documentos clasificados.", xpReward: 100, content: { question: "Te piden tirar a la basura contratos vencidos de hace 10 años. ¿Cómo lo haces?", options: ["Al contenedor de reciclaje público.", "Usando la destructora de papel de la oficina.", "Enviándolos con el personal de limpieza habitual."], correctAnswer: 1, explanation: "La información confidencial impresa debe ser destruida físicamente (Shredding) para evitar ataques de Trashing (robo de basura)." } },
  { id: 12, title: "Actualizaciones Pendientes", type: "quiz", description: "Importancia de los parches de seguridad.", xpReward: 100, content: { question: "Tu sistema operativo te pide reiniciar para instalar parches críticos de seguridad. Tienes mucho trabajo.", options: ["Pospongo la actualización para el próximo mes.", "Instalo el parche de inmediato durante mi hora de almuerzo.", "Ignoro el mensaje para siempre."], correctAnswer: 1, explanation: "Las actualizaciones parchean vulnerabilidades conocidas. Retrasarlas deja el sistema expuesto." } },
  { id: 13, title: "Phishing: Contraloría", type: "phishing", description: "Suplantación de autoridades superiores.", xpReward: 200, content: { emails: [{ id:1, sender:"investigacion@contraloriagov.co", subject:"Auditoría Sorpresa", content:"Por favor descargue la citación.", link:"http://contraloriagov.co/citacion.exe", isPhishing:true, explanation:"Disfrazan malware como citaciones legales."}] } },
  { id: 14, title: "Bloqueo de Pantalla", type: "quiz", description: "Políticas de escritorio limpio.", xpReward: 100, content: { question: "Vas a tomar un café y dejas tu oficina. ¿Qué haces con tu PC?", options: ["Lo dejo desbloqueado porque vuelvo en 2 minutos.", "Bloqueo la sesión usando Win + L.", "Solo apago el monitor."], correctAnswer: 1, explanation: "Siempre bloquea tu equipo al alejarte para prevenir accesos físicos no autorizados." } },
  { id: 15, title: "Protección de Redes Sociales", type: "password", description: "Protege la cuenta de Twitter de la Alcaldía.", xpReward: 200, content: { context: "La cuenta de prensa de la alcaldía necesita una clave robusta." } },
  { id: 16, title: "Smishing (SMS)", type: "quiz", description: "Phishing a través de mensajes de texto.", xpReward: 100, content: { question: "Recibes un SMS de 'AlcaldiaIT' pidiendo verificar tu cuenta en un enlace bit.ly. ¿Qué haces?", options: ["Hacer clic en el enlace desde el móvil.", "Ignorar y reportar el mensaje a TI.", "Responder el mensaje pidiendo confirmación."], correctAnswer: 1, explanation: "Las instituciones no piden verificar contraseñas vía SMS con enlaces acortados." } },
  { id: 17, title: "Fraude de Proveedores", type: "phishing", description: "Cambio de cuentas bancarias.", xpReward: 250, content: { emails: [{ id:1, sender:"finanzas@proveedordeoficina.com", subject:"NUEVA CUENTA BANCARIA", content:"Favor transferir los pagos de este mes a esta nueva cuenta.", link:"http://proveedordeoficina.com/banco", isPhishing:true, explanation:"El fraude de facturas (BEC) busca desviar fondos a cuentas de los atacantes."}] } },
  { id: 18, title: "Macros en Excel", type: "quiz", description: "Peligros de los documentos adjuntos.", xpReward: 150, content: { question: "Descargas un archivo llamado 'Presupuesto.xlsx' de un remitente externo. Al abrirlo, te pide habilitar macros. ¿Qué haces?", options: ["Habilitar macros para ver los números.", "No habilitar macros y contactar al remitente.", "Reenviarlo a todos los compañeros."], correctAnswer: 1, explanation: "Las macros son usadas frecuentemente para ejecutar malware silencioso." } },
  { id: 19, title: "Contraseñas Compartidas", type: "quiz", description: "Compartir credenciales de acceso.", xpReward: 150, content: { question: "Tu jefe olvidó su clave del portal de contratos y te pide prestada la tuya 'solo por 5 minutos'.", options: ["Se la doy, es mi jefe.", "Le digo que el sistema registra mis acciones y que debe restablecer su clave.", "Le anoto mi clave en un post-it."], correctAnswer: 1, explanation: "Las credenciales son intransferibles para garantizar el principio de no repudio." } },
  { id: 20, title: "Ingeniería Social Física", type: "quiz", description: "Tailgating en áreas restringidas.", xpReward: 150, content: { question: "Al entrar a la zona de servidores (acceso con tarjeta), alguien viene detrás cargando cajas y te pide que le sostengas la puerta.", options: ["Le sostengo la puerta por cortesía.", "Le pido amablemente que pase su propia tarjeta de acceso.", "Le ayudo a cargar las cajas sin pedirle identificación."], correctAnswer: 1, explanation: "El Tailgating es aprovechar la cortesía humana para saltarse los controles físicos." } },
  { id: 21, title: "Seguridad Móvil", type: "password", description: "Claves seguras en dispositivos corporativos.", xpReward: 200, content: { context: "El teléfono corporativo requiere un nuevo PIN y clave segura para acceder a correos." } },
  { id: 22, title: "Phishing: Obras Públicas", type: "phishing", description: "Protege licitaciones importantes.", xpReward: 250, content: { emails: [{id:1, sender:"sistemas@infraestructura-gob.com", subject:"Planos Adjuntos - Licitación", content:"Descargue los planos en .rar", link:"http://infraestructura-gob.com/planos", isPhishing:true, explanation:"Dominio engañoso y uso de archivos comprimidos raros."}] } },
  { id: 23, title: "Manejo de Incidentes", type: "quiz", description: "Procedimiento correcto al detectar una falla.", xpReward: 150, content: { question: "Te das cuenta que accidentalmente enviaste una tabla con los correos de 10,000 ciudadanos a un contratista equivocado.", options: ["Lo oculto y no le digo a nadie.", "Intento borrar el correo de su bandeja enviando un mensaje de 'recall'.", "Lo reporto inmediatamente al Oficial de Privacidad y TI."], correctAnswer: 2, explanation: "La transparencia y rapidez en reportar fugas de datos mitiga las multas y los daños." } },
  { id: 24, title: "Deepfakes de Audio", type: "quiz", description: "El fraude del jefe con IA.", xpReward: 200, content: { question: "Recibes una nota de voz por WhatsApp que suena EXACTAMENTE como el Alcalde, pidiendo transferir $50 millones urgentemente.", options: ["Hacer la transferencia inmediatamente.", "Llamarlo al número oficial o confirmar por otro canal oficial antes de hacer algo.", "Reenviar el audio a finanzas."], correctAnswer: 1, explanation: "Los atacantes clonan voces con IA (Deepfakes). Siempre verifica solicitudes financieras anómalas por múltiples canales." } },
  { id: 25, title: "Graduación: Agente Élite", type: "quiz", description: "Prueba final de conocimientos.", xpReward: 500, content: { question: "La ciberseguridad es responsabilidad exclusiva de:", options: ["El departamento de TI (Sistemas).", "Solo del Alcalde y los directivos.", "De todos los funcionarios, independientemente de su rol."], correctAnswer: 2, explanation: "El eslabón más débil en ciberseguridad siempre es el usuario humano. Todos somos el escudo." } }
];
